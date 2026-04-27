// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import React, { useState } from 'react';
import styles from './styles.module.css';

export default function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const safeImages = Array.isArray(images) ? images : [];
  const imageCount = safeImages.length;
  const hasMultipleImages = imageCount > 1;

  if (imageCount === 0) {
    return null;
  }

  const currentImage = safeImages[current];

  const prev = () => {
    if (!hasMultipleImages) return;
    setCurrent((c) => (c - 1 + imageCount) % imageCount);
  };

  const next = () => {
    if (!hasMultipleImages) return;
    setCurrent((c) => (c + 1) % imageCount);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.imageWrapper}>
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
        {currentImage.caption && (
          <p className={styles.caption}>{currentImage.caption}</p>
        )}
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          onClick={prev}
          aria-label="Previous image"
          disabled={!hasMultipleImages}
        >
          &#8592;
        </button>
        <span className={styles.counter} aria-live="polite">
          {current + 1} / {imageCount}
        </span>
        <button
          type="button"
          className={styles.btn}
          onClick={next}
          aria-label="Next image"
          disabled={!hasMultipleImages}
        >
          &#8594;
        </button>
      </div>
      <div className={styles.dots}>
        {safeImages.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
