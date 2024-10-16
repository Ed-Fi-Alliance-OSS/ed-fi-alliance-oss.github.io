// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import React from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import VersionDropDown from '../../../../components/VersionDropDown';

export default function ContentWrapper(props) {
  return (
    <>
      <VersionDropDown />
      <Content {...props} />
    </>
  );
}
