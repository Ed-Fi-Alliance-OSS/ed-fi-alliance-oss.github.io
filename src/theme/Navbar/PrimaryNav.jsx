import {useEffect, useState} from 'react';
import clsx from 'clsx';
import {useColorMode} from '@docusaurus/theme-common';
import SearchBar from '@theme/SearchBar';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useLocation} from '@docusaurus/router';
import styles from './primaryStyles.module.css';

// NOTE: Desktop-focused primary nav. Original Docusaurus Navbar kept for mobile only.
export default function PrimaryNav() {
  const {siteConfig} = useDocusaurusContext();
  const items = siteConfig.themeConfig?.navbar?.items || [];
  const leftItems = items.filter(i => i.position === 'left');
  const {colorMode, setColorMode} = useColorMode();
  const [isMac, setIsMac] = useState(false);
  useEffect(() => { setIsMac(/Mac|iPod|iPhone|iPad/.test(window.navigator.platform)); }, []);
  const location = useLocation();

  const isActive = (item) => {
    if (!item.to) return false;
    if (item.to === '/') return location.pathname === '/';
    return location.pathname === item.to || location.pathname.startsWith(item.to + '/');
  };

  const toggle = () => setColorMode(colorMode === 'dark' ? 'light' : 'dark');

  return (
    <div className={styles.primaryNavWrapper} role="region" aria-label="Primary navigation wrapper">
      <nav className={styles.primaryNav} aria-label="Main">
        <div className={styles.inner}>
          <div className={styles.topSideBar}>
            <a href="/" className={styles.brand} aria-label="Ed-Fi Docs home">
              <img
                src={colorMode === 'dark' ? '/img/ed-fi-logo-dark.svg' : '/img/ed-fi-logo-light.svg'}
                alt="Ed-Fi Alliance"
                className={styles.logoImg}
                width={160}
                height={44}
                loading="eager"
              />
            </a>
            <span className={styles.dividerThin} aria-hidden="true" />
            <a href="/" className={clsx(styles.docsHome,'docs-home-link')} aria-current={location.pathname === '/' ? 'page' : undefined}>Docs</a>
          </div>
          <div className={styles.searchRegion}>
            <div className={styles.searchShell} role="search">
              <span className={styles.searchIcon} aria-hidden="true">
                {/* magnifier svg */}
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none" focusable="false" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.23366 12.4248C9.20395 12.4248 11.6118 10.0169 11.6118 7.04664C11.6118 4.07635 9.20395 1.66846 6.23366 1.66846C3.26337 1.66846 0.855469 4.07635 0.855469 7.04664C0.855469 10.0169 3.26337 12.4248 6.23366 12.4248Z" stroke="currentColor" strokeWidth="1.39049" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.918 14.7309L10.061 10.8739" stroke="currentColor" strokeWidth="1.39049" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <SearchBar placeholder="Search" />
              <kbd className={styles.shortcut} aria-label="Keyboard shortcut"><div><span>{isMac ? '⌘' : 'Ctrl'}</span></div> <div><span>K</span></div></kbd>
            </div>
          </div>
          <ul className={styles.navLinks}>
            {leftItems.map(item => {
              const active = isActive(item);
              return (
                <li key={item.label} className={styles.navItem}>
                  <a
                    href={item.to || item.href}
                    className={clsx(styles.navLink, active && styles.navLinkActive)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <button type="button" onClick={toggle} className={styles.modeToggle} aria-label="Toggle dark mode" aria-pressed={colorMode === 'dark'}>
            <div className={styles.modeToggleInner}>
              {colorMode === 'dark' ? (
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M9.37 5.51A7 7 0 0 0 17 15a7 7 0 0 1-7.63-9.49M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z"/></svg>
              ) : (
                <img src="/img/light-mode.svg" alt="Light mode" width="20" height="20" />
              )}
            </div>
          </button>
          </ul>

        </div>
      </nav>
    </div>
  );
}
