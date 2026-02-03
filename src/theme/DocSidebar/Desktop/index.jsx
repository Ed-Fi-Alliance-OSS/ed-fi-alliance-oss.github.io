// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import DocSidebarItems from '@theme/DocSidebarItems';
import { SideBarVersionDropDown } from '../../../components/VersionDropDown';

// Custom Desktop sidebar: mirror original structure but omit the site-level "Collapse sidebar" button
export default function DocSidebarDesktop({ sidebar, path }) {
  return (
    <aside className={clsx('theme-doc-sidebar-container')}>
      <div className="sidebarViewport_aRkj">
        <div className="sidebar_njMd">
          {/* keep the version dropdown at the top */}
          <SideBarVersionDropDown />
          <nav aria-label="Docs sidebar" className={clsx('menu thin-scrollbar', ThemeClassNames.docs.docSidebar)}>
            <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
              <DocSidebarItems items={sidebar} activePath={path} level={1} />
            </ul>
          </nav>
          {/* intentionally do NOT render the site-level collapse button here */}
        </div>
      </div>
    </aside>
  );
}
