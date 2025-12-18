import React from 'react';
import DocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props) {
  return (
    <>
    <div className="edfi-doc-item">
      <DocItem {...props} />
      </div>
    </>
  );
}
