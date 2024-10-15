// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import React from 'react';
import {useLocation} from '@docusaurus/router';
import Content from '@theme-original/DocSidebar/Desktop/Content';


const odsApi = [
    {
      path: '/docs/ods-api',
      number: '7.2'
    },
    {
      path: '/docs/ods-api/6.2',
      number: '6.2'
    },
    {
      path: '/docs/ods-api/5.4',
      number: '5.4'
    }
  ];

function VersionDropDown(props) {
  return (
    <div className="dropdown dropdown--hoverable margin-top--md margin-left--md">
    <button className="button button--secondary navbar__link">
      {props.product} Versions
    </button>
    <ul className="dropdown__menu">
    {props.versions.map((version, index) => (
      <li key={index}>
        <a className="dropdown__link" href={ "/docs/" + version.path }>
          v{version.number}
        </a>
      </li>
    ))}
    </ul>
  </div>
  );
}

export default function ContentWrapper(props) {
  const {pathname} = useLocation();

  if (pathname.includes('/ods-api/')) {
    return (
      <>
        <VersionDropDown product="ODS/API" versions={odsApi} />
        <Content {...props} />
      </>
    );
  }
  return (
    <>
      <Content {...props} />
    </>
  );
}
