import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import styles from './styles.module.css';
import PrimaryNav from './PrimaryNav';

export default function Navbar(props) {
  return (
    <>
      <div className={styles.topBar} role="region" aria-label="Ed-Fi top bar">
        <div className={styles.topBarInner}>
          <div className={styles.topLeft}>
            <a href="https://www.ed-fi.org/" className={styles.topLink} target="_blank" rel="noopener noreferrer">Ed-fi.org</a>
            <a href="/" className={`${styles.topLink} ${styles.active}`} aria-current="page">Docs</a>
            <a href="/community" className={styles.topLink}>Community</a>
            <a href="https://academy.ed-fi.org/" className={styles.topLink} target="_blank" rel="noopener noreferrer">Academy</a>
          </div>
          <div className={styles.topRight}>
            <a href="https://github.com/Ed-Fi-Alliance-OSS" className={styles.iconLink} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.2-3.08-.12-.29-.52-1.47.11-3.07 0 0 .98-.31 3.21 1.18.93-.26 1.93-.39 2.92-.39.99 0 1.99.13 2.92.39 2.23-1.49 3.21-1.18 3.21-1.18.63 1.6.23 2.78.11 3.07.75.8 1.2 1.82 1.2 3.08 0 4.43-2.69 5.4-5.25 5.69.42.36.8 1.07.8 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A10.515 10.515 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
              </svg>
            </a>
            <a href="https://twitter.com/EdFiAlliance" className={styles.iconLink} aria-label="X" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.15 12.15 0 013 4.79a4.28 4.28 0 001.33 5.72c-.66-.02-1.28-.2-1.82-.5v.05a4.28 4.28 0 003.43 4.2c-.6.16-1.23.2-1.88.08.53 1.64 2.06 2.83 3.88 2.86A8.59 8.59 0 012 19.54a12.14 12.14 0 006.58 1.93c7.9 0 12.23-6.54 12.23-12.22v-.56A8.72 8.72 0 0024 5.5a8.6 8.6 0 01-2.54.7z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/ed-fi/" className={styles.iconLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fill="currentColor" d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98s1.98-.88 1.98-1.98C6.96 4.38 6.08 3.5 4.98 3.5zM3.5 8.98h3v11.02h-3V8.98zM9.5 8.98h2.87v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v6.48h-3V15.3c0-1.45-.03-3.32-2.03-3.32-2.03 0-2.34 1.58-2.34 3.2v4.82h-3V8.98z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <PrimaryNav />
      {/* Original Navbar kept only for mobile (hidden on desktop via CSS override below) */}
      <div className={styles.mobileOnly}> <OriginalNavbar {...props} /> </div>
    </>
  );
}
