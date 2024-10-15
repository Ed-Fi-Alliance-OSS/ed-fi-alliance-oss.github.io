// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Admonition from '@theme/Admonition';

export default () => (
  <div>
    <Admonition type="caution">
      Version 5.4 is in "maintenance mode" and will continue receiving emergency
      bug fixes through June 30, 2025, after which time it will no longer be
      actively maintained. Use the version button in the left sidebar to access
      documentation for newer versions.
    </Admonition>

    <Admonition type="tip">
      🚧 This site is under construction. In the meantime, please see{' '}
      <a href="https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/overview">
        Ed-Fi ODS / API for Suite 3 v5.4
      </a>{' '}
      for more information.
    </Admonition>
  </div>
);
