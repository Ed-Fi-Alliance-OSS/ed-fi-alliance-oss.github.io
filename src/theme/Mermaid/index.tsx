/**
 * Swizzled @theme/Mermaid component with optional pan/zoom viewport.
 *
 * Usage (standard, no viewport):
 *   <Mermaid value={diagram} />
 *
 * Usage (with interactive viewport):
 *   <Mermaid value={diagram} viewport />
 *
 * The viewport manipulates the SVG viewBox attribute
 * so vector text stays sharp at every zoom level.
 *
 * Features:
 *   - Mouse-wheel zoom centered on cursor
 *   - Drag to pan (pointer events, works on touch)
 *   - Zoom-in / zoom-out / reset buttons
 */

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {ErrorBoundaryErrorMessageFallback} from '@docusaurus/theme-common';
import {
  MermaidContainerClassName,
  useMermaidRenderResult,
} from '@docusaurus/theme-mermaid/client';
import type {Props as MermaidProps} from '@theme/Mermaid';

import styles from './styles.module.css';

// ─── extended props ───────────────────────────────────────────────────────────

interface Props extends MermaidProps {
  /** Enable the interactive pan/zoom viewport. Defaults to false. */
  viewport?: boolean;
}

// ─── constants ────────────────────────────────────────────────────────────────

const ZOOM_STEP = 1.25;
/** Minimum viewBox width as a fraction of the natural diagram width (= max zoom). */
const MIN_VB_FRACTION = 0.05;
/** Maximum viewBox width as a fraction of the natural diagram width (= min zoom). */
const MAX_VB_FRACTION = 4;

// ─── plain render (no viewport) ───────────────────────────────────────────────

function MermaidPlain({
  renderResult,
}: {
  renderResult: NonNullable<ReturnType<typeof useMermaidRenderResult>>;
}): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderResult.bindFunctions?.(ref.current!);
  }, [renderResult]);

  return (
    <div
      ref={ref}
      className={`${MermaidContainerClassName} ${styles.plainContainer}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: renderResult.svg}}
    />
  );
}

// ─── pan/zoom viewport (viewBox-based) ────────────────────────────────────────

interface ViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

function vbString({x, y, w, h}: ViewBox): string {
  return `${x} ${y} ${w} ${h}`;
}

function MermaidViewport({
  renderResult,
}: {
  renderResult: NonNullable<ReturnType<typeof useMermaidRenderResult>>;
}): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  /** Direct reference to the SVG element for fast DOM updates without re-renders. */
  const svgRef = useRef<SVGSVGElement | null>(null);
  /** Natural (original) viewBox read from the rendered SVG. */
  const naturalVB = useRef<ViewBox | null>(null);
  /** Current viewBox tracked in a ref to avoid re-reading the DOM attribute. */
  const currentVB = useRef<ViewBox | null>(null);
  /** Pre-computed zoom limits, set once during setup. */
  const minVBW = useRef(0);
  const maxVBW = useRef(0);
  /** Whether the SVG has been set up and the controls should be shown. */
  const [ready, setReady] = useState(false);
  const isDragging = useRef(false);
  const lastPos = useRef({x: 0, y: 0});
  /** Container dimensions captured at drag start to avoid per-event layout reads. */
  const dragContainerSize = useRef({w: 0, h: 0});

  // ── set up SVG after Mermaid renders ─────────────────────────────────────
  useEffect(() => {
    const content = contentRef.current;
    const container = containerRef.current;
    if (!content || !container) return;

    renderResult.bindFunctions?.(content);

    const svg = content.querySelector('svg') as SVGSVGElement | null;
    if (!svg) return;

    const vbStr = svg.getAttribute('viewBox');
    if (!vbStr) return;

    const parts = vbStr.trim().split(/[\s,]+/).map(Number);
    if (parts.length < 4 || !parts[2] || !parts[3]) return;
    const [vbX, vbY, vbW, vbH] = parts;

    svgRef.current = svg;
    naturalVB.current = {x: vbX, y: vbY, w: vbW, h: vbH};
    currentVB.current = {x: vbX, y: vbY, w: vbW, h: vbH};
    minVBW.current = vbW * MIN_VB_FRACTION;
    maxVBW.current = vbW * MAX_VB_FRACTION;

    // Make SVG fill its container so the viewBox drives what's visible.
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.display = 'block';
    svg.style.maxWidth = 'none';

    // Size the container to preserve the diagram's aspect ratio, capped at 75vh.
    const cw = container.offsetWidth;
    const naturalH = cw * (vbH / vbW);
    const maxH = window.innerHeight * 0.75;
    container.style.height = `${Math.max(200, Math.min(naturalH, maxH))}px`;

    setReady(true);
  }, [renderResult]);

  // ── helpers that operate directly on the SVG DOM element ─────────────────

  /** Write a new viewBox to the SVG, clamping zoom limits, and update the ref. */
  const writeVB = useCallback((vb: ViewBox) => {
    const svg = svgRef.current;
    if (!svg || !currentVB.current) return;

    const clampedW = Math.max(minVBW.current, Math.min(vb.w, maxVBW.current));
    const clampedH = clampedW * (vb.h / vb.w);
    const next = {x: vb.x, y: vb.y, w: clampedW, h: clampedH};

    svg.setAttribute('viewBox', vbString(next));
    currentVB.current = next;
  }, []);

  // ── reset ─────────────────────────────────────────────────────────────────
  const resetView = useCallback(() => {
    const svg = svgRef.current;
    const nat = naturalVB.current;
    if (!svg || !nat) return;
    svg.setAttribute('viewBox', vbString(nat));
    currentVB.current = {...nat};
  }, []);

  // ── zoom around a screen-space point ─────────────────────────────────────
  const zoomAt = useCallback(
    (factor: number, sx: number, sy: number) => {
      const container = containerRef.current;
      const svg = svgRef.current;
      const vb = currentVB.current;
      if (!container || !svg || !vb) return;

      // Use the actual rendered SVG bounds so that coordinate mapping is correct
      // even when the container height cap causes the SVG to be letterboxed.
      const containerRect = container.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      const cw = svgRect.width;
      const ch = svgRect.height;
      // Convert container-relative coords to SVG-rendered-area-relative coords.
      const localX = sx - (svgRect.left - containerRect.left);
      const localY = sy - (svgRect.top - containerRect.top);

      // Clamp the new width *before* computing x/y so the anchor point under
      // the cursor does not drift when the zoom limit is already reached.
      const newW = Math.max(minVBW.current, Math.min(vb.w / factor, maxVBW.current));
      const newH = newW * (vb.h / vb.w);
      // Keep the SVG point under (localX, localY) fixed during zoom.
      const svgX = vb.x + (localX / cw) * vb.w;
      const svgY = vb.y + (localY / ch) * vb.h;
      writeVB({
        x: svgX - (localX / cw) * newW,
        y: svgY - (localY / ch) * newH,
        w: newW,
        h: newH,
      });
    },
    [writeVB],
  );

  // ── non-passive wheel handler ─────────────────────────────────────────────
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      zoomAt(
        e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP,
        e.clientX - rect.left,
        e.clientY - rect.top,
      );
    },
    [zoomAt],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, {passive: false});
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // ── pointer drag ──────────────────────────────────────────────────────────
  const handlePointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPos.current = {x: e.clientX, y: e.clientY};
    // Capture SVG rendered size (not container size) so drag distances are mapped
    // correctly even when the container height cap letterboxes the SVG.
    const svg = svgRef.current;
    if (svg) {
      const svgRect = svg.getBoundingClientRect();
      dragContainerSize.current = {w: svgRect.width, h: svgRect.height};
    }
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      const vb = currentVB.current;
      if (!vb) return;

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = {x: e.clientX, y: e.clientY};

      const {w: cw, h: ch} = dragContainerSize.current;
      // Drag right → viewBox shifts left (showing content to the right).
      writeVB({
        ...vb,
        x: vb.x - (dx / cw) * vb.w,
        y: vb.y - (dy / ch) * vb.h,
      });
    },
    [writeVB],
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // ── button zoom (centered on SVG rendered area) ───────────────────────────
  const zoomAround = useCallback(
    (factor: number) => {
      const container = containerRef.current;
      const svg = svgRef.current;
      if (!container || !svg) return;
      const containerRect = container.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      // Zoom center = center of the SVG's rendered area, in container-relative coords.
      zoomAt(
        factor,
        svgRect.left - containerRect.left + svgRect.width / 2,
        svgRect.top - containerRect.top + svgRect.height / 2,
      );
    },
    [zoomAt],
  );

  return (
    <div className={styles.wrapper}>
      {ready && (
        <div className={styles.controls} aria-label="Diagram controls">
          <button
            className={styles.btn}
            onClick={() => zoomAround(ZOOM_STEP)}
            title="Zoom in"
            aria-label="Zoom in">
            +
          </button>
          <button
            className={styles.btn}
            onClick={() => zoomAround(1 / ZOOM_STEP)}
            title="Zoom out"
            aria-label="Zoom out">
            −
          </button>
          <button
            className={styles.btn}
            onClick={resetView}
            title="Reset view"
            aria-label="Reset view">
            ⟳
          </button>
        </div>
      )}
      <div
        ref={containerRef}
        className={`${MermaidContainerClassName} ${styles.viewport}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}>
        <div
          ref={contentRef}
          className={styles.svgHolder}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: renderResult.svg}}
        />
      </div>
    </div>
  );
}

// ─── renderer ─────────────────────────────────────────────────────────────────

function MermaidRenderer({value, viewport}: Props): ReactNode {
  const renderResult = useMermaidRenderResult({text: value});
  if (renderResult === null) return null;
  return viewport ? (
    <MermaidViewport renderResult={renderResult} />
  ) : (
    <MermaidPlain renderResult={renderResult} />
  );
}

// ─── public export ────────────────────────────────────────────────────────────

export default function Mermaid(props: Props): ReactNode {
  return (
    <ErrorBoundary
      fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}>
      <MermaidRenderer {...props} />
    </ErrorBoundary>
  );
}
