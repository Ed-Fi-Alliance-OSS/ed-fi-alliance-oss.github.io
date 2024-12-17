// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { useLocation } from '@docusaurus/router';

const odsApi = [
  {
    path: '/reference/ods-api/',
    number: '7.3',
  },
  {
    path: '/reference/ods-api/7.2/',
    number: '7.2',
  },
  {
    path: '/reference/ods-api/7.1/',
    number: '7.1',
  },
  {
    path: '/reference/ods-api/6.2/',
    number: '6.2',
  },
  {
    path: '/reference/ods-api/5.4/',
    number: '5.4',
  },
];

function VersionDropDown(product, versions) {
  return (
    <div className="dropdown dropdown--hoverable margin-top--md margin-left--md">
      <button className="button button--secondary navbar__link">
        {product} Versions
      </button>
      <ul className="dropdown__menu">
        {versions.map((version, index) => (
          <li key={index}>
            <a className="dropdown__link" href={version.path}>
              v{version.number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OdsApiDropDown() {
  return VersionDropDown('ODS/API', odsApi);
}

function SideBarVersionDropDown() {
  const { pathname } = useLocation();
  if (pathname.includes('/ods-api/')) {
    return OdsApiDropDown();
  }
  else {
    return '';
  }
}

export { VersionDropDown, OdsApiDropDown, SideBarVersionDropDown };
