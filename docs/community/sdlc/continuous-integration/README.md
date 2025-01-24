# Continuous Integration

:::note

Ed-Fi continuous integration (CI) practices and procedures

:::

## Overview

1. Utilize CI and automation wherever possible.
2. Infrastructure as Code (IaC) is critical, though we have some legacy
   exceptions (most relevant: old Octopus Deploy configurations).
3. "Continuous Deployment" (CD) is less relevant for Ed-Fi software, since we're
   providing software for other organizations to use. However, we do have a true
   CI/CD pipeline for the ODS Platform team.
4. As of 2022, we are shifting from TeamCity to GitHub Actions.

## Child Pages

import DocCardList from '@theme/DocCardList';

<DocCardList />
