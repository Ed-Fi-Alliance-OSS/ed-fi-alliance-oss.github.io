import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
export default function PaginatorNavLink(props) {
  const {permalink, title, subLabel, isNext} = props;
  return (
    <Link
      className={clsx(
        'ed-fi-pagination-nav-link pagination-nav__link',
        isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
      )}
      to={permalink}>
        {!isNext && (
          <span className="pagination-nav__arrow prev" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" fill="none">
              <path d="M0.39055 8.18098C2.47679e-05 7.79046 2.48232e-05 7.15729 0.39055 6.76677L6.75451 0.402808C7.14504 0.0122841 7.7782 0.0122841 8.16872 0.402809C8.55925 0.793333 8.55925 1.4265 8.16872 1.81702L2.51187 7.47388L8.16872 13.1307C8.55925 13.5213 8.55925 14.1544 8.16872 14.5449C7.7782 14.9355 7.14503 14.9355 6.75451 14.5449L0.39055 8.18098ZM15.0898 7.47388L15.0898 8.47388L1.09766 8.47388L1.09766 7.47388L1.09766 6.47388L15.0898 6.47388L15.0898 7.47388Z" fill="#0E31E7" />
            </svg>
          </span>
        )}
        <div className="pagination-nav-info">
          {subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
          <div className="pagination-nav__label">{title}</div>
        </div>
        {isNext && (
          <span className="pagination-nav__arrow next" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" fill="none">
              <path d="M15.547 8.18098C15.9375 7.79046 15.9375 7.15729 15.547 6.76677L9.18299 0.402808C8.79246 0.0122841 8.1593 0.0122841 7.76878 0.402809C7.37825 0.793333 7.37825 1.4265 7.76878 1.81702L13.4256 7.47388L7.76878 13.1307C7.37825 13.5213 7.37825 14.1544 7.76878 14.5449C8.1593 14.9355 8.79247 14.9355 9.18299 14.5449L15.547 8.18098ZM0.847656 7.47388L0.847656 8.47388L14.8398 8.47388L14.8398 7.47388L14.8398 6.47388L0.847656 6.47388L0.847656 7.47388Z" fill="#0E31E7" />
            </svg>
          </span>
        )}
    </Link>
  );
}
