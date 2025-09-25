import React from 'react';
import DocBreadcrumbs from '@theme-original/DocBreadcrumbs';

export default function DocBreadcrumbsWrapper(props) {
  return (
    <>
      <div className="edfi-breadcrumbs-wrap">
        <DocBreadcrumbs {...props} />
      </div>
    </>
  );
}
