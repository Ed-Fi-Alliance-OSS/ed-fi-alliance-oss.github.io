# Admin App Transitioning to Ed-Fi Exchange in 2025

12 Dec 2023

## What is Happening

The next planned release of Admin App, version 3.3, will be the last supported
release of Admin App. From that point, it will be in maintenance mode until
June, 2025. While in maintenance mode, a new patch release will only occur for
critical bugs and security updates. In 2025, Admin App will move to the Ed-Fi
Exchange and the source repository will be set into archive, signaling that the
application support has formally ended.

:::note

Admin App 3.x supports ODS/API 5.x and ODS/API 6.x. It does not support ODS/API
7.x or beyond.

:::

## Why?

Admin App's original design premise was to support single Local Education
Agencies (LEA) who were deploying the Ed-Fi ODS/API for their own use. The Ed-Fi
Alliance has moved away from encouraging this deployment model, finding that we
can drive change more quickly, and the community has more success, when LEA's
are supported through a large-scale deployment that is managing many instances.
Admin App is not an effective tool for these scenarios.

In 2024, the Ed-Fi Alliance will provide a replacement tool that is tuned for
these large-scale deployments and is useful for those lone LEA's who still wish
to be self-sufficient. This will be called "Admin Console"

## Next Steps for Users

* Watch for release announcements about Admin App 3.3 and the future Admin
  Console 1.0.
* Anyone wishing to continue using Admin App from 2025 and beyond is welcome to
  create a fork of the source code repository.
