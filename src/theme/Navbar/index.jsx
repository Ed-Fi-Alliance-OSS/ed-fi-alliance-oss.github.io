import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import styles from './styles.module.css';

export default function Navbar(props) {
  return (
    <>
      <div className={styles.topBar} role="region" aria-label="Ed-Fi top bar">
        <div className={styles.topBarInner}>
          {/* Optional: site-wide announcement or small links can go here */}
        </div>
      </div>
      <OriginalNavbar {...props} />
    </>
  );
}
