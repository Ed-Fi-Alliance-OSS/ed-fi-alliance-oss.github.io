import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {useColorMode} from '@docusaurus/theme-common';
import SearchBar from '@theme/SearchBar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './primaryStyles.module.css';

// NOTE: Desktop-focused primary nav. Original Docusaurus Navbar kept for mobile only.
export default function PrimaryNav() {
  const {siteConfig} = useDocusaurusContext();
  const items = siteConfig.themeConfig?.navbar?.items || [];
  const leftItems = items.filter(i => i.position === 'left');
  const {colorMode, setColorMode} = useColorMode();
  const [isMac, setIsMac] = useState(false);
  useEffect(() => { setIsMac(/Mac|iPod|iPhone|iPad/.test(window.navigator.platform)); }, []);

  const toggle = () => setColorMode(colorMode === 'dark' ? 'light' : 'dark');

  return (
    <div className={styles.primaryNavWrapper} role="region" aria-label="Primary navigation wrapper">
      <nav className={styles.primaryNav} aria-label="Main">
        <div className={styles.inner}>
          <a href="/" className={styles.brand} aria-label="Ed-Fi Docs home">
            <img
              src={colorMode === 'dark' ? '/img/ed-fi-logo-light.webp' : '/img/ed-fi-logo.webp'}
              alt="Ed-Fi Alliance"
              className={styles.logoImg}
              width={160}
              height={44}
              loading="eager"
            />
          </a>
          <span className={styles.dividerThin} aria-hidden="true" />
          <a href="/" className={clsx(styles.docsHome,'docs-home-link')}>Docs</a>
          <span className={styles.dividerSection} aria-hidden="true" />
          <div className={styles.searchRegion}>
            <div className={styles.searchShell} role="search">
              <span className={styles.searchIcon} aria-hidden="true">
                {/* magnifier svg */}
                <svg viewBox="0 0 24 24" width="18" height="18" focusable="false" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.494 4.494 0 0 1 9.5 14Z"/></svg>
              </span>
              <SearchBar placeholder="Search" />
              <kbd className={styles.shortcut} aria-label="Keyboard shortcut">{isMac ? '⌘' : 'Ctrl'} K</kbd>
            </div>
          </div>
          <ul className={styles.navLinks}>
            {leftItems.map(item => (
              <li key={item.label} className={styles.navItem}>
                <a href={item.to || item.href} className={styles.navLink} {...(item.to === '/reference' ? {'data-active-root':'reference'}: {})}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button type="button" onClick={toggle} className={styles.modeToggle} aria-label="Toggle dark mode" aria-pressed={colorMode === 'dark'}>
            {colorMode === 'dark' ? (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M9.37 5.51A7 7 0 0 0 17 15a7 7 0 0 1-7.63-9.49M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M6.76 4.84 5.35 3.43 3.93 4.84l1.41 1.42 1.42-1.42ZM4 13H2v-2h2v2Zm10-9h-2v2h2V4Zm7.07 2.93-1.41-1.41-1.42 1.41 1.42 1.42 1.41-1.42ZM17.24 19.16l1.41 1.41 1.42-1.41-1.42-1.42-1.41 1.42ZM20 13v-2h2v2h-2ZM12 20h2v-2h-2v2ZM6.34 17.24l-1.42 1.42 1.42 1.41 1.41-1.41-1.41-1.42ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/></svg>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}
