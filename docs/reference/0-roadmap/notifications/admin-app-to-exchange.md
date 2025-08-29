# Admin App Transitioning to Ed-Fi Exchange in 2026

First published: 12 Dec 2023 \
Updated: 14 August 2025

## What is Happening

The next planned release of Admin App, version 3.3, will be the last supported
release of Admin App. From that point, it will be in maintenance mode until
June, ~~2025~~ 2026. While in maintenance mode, a new patch release will only occur for
critical bugs and security updates. In ~~2025~~ 2026, Admin App will move to the Ed-Fi
Exchange and the source repository will be set into archive, signaling that the
application support has formally ended.

Because no replacement was ready yet, the Alliance decided in June 2025 to extend the
support date by one year. The [v3.3.4](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp/releases/tag/v3.3.4)
release is the last planned release, unless there are critical bugs / security
issues.

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

In ~~2024~~ 2025, the Ed-Fi Alliance will provide a replacement tool that is tuned for
these large-scale deployments and is useful for those lone LEA's who still wish
to be self-sufficient.

## Next Steps for Users

* Watch for release announcements about Admin App 3.3 and the future replacement.
* Anyone wishing to continue using Admin App from 2026 and beyond is welcome to
  create a fork of the source code repository.
