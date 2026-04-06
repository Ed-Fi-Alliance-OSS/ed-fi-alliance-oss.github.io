# Enrollment API Composite Deprecation in Favor of OneRoster Standard

First published: 6 April 2026

## What is Happening

The Ed-Fi Alliance is deprecating the Enrollment API composite component in the ODS/API, effective immediately with the release of ODS/API 7.3.2. The Alliance is adopting the OneRoster 1.2 standard as the canonical API for student rostering use cases.

With ODS/API 7.3.2 and the new Ed-Fi OneRoster API, education agencies and vendors now have a standards-based alternative that integrates seamlessly with the ODS/API and simplifies rostering integrations. The Enrollment API composite will be removed in a future ODS/API release; this provides a transition period for existing implementations to migrate.

:::note

The Enrollment API composite remains functional in ODS/API 7.3.x releases, but will not receive new features or enhancements. Plan your migration accordingly.

:::

## Why?

The Enrollment API was designed to support compositing patterns for rostering data. The OneRoster 1.2 standard—now integrated directly into the Ed-Fi ODS/API—addresses the same use cases more effectively:

- **Community alignment**: OneRoster is maintained by 1EdTech and used across the K–12 EdTech ecosystem, reducing the need for custom integrations.
- **Simplified operations**: Agencies can now serve a standards-compliant OneRoster endpoint directly from their Ed-Fi ODS, without maintaining separate rostering infrastructure.
- **Unified security**: OneRoster and standard Ed-Fi APIs share authentication and authorization, reducing operational complexity.
- **Broader support**: OneRoster is backed by 1EdTech and a cross-industry Rostering Steering Committee, whereas the Enrollment API composite had limited adoption.

## Next Steps for Users

- **If you're building new integrations**: Use the Ed-Fi OneRoster API instead of the Enrollment API composite. Documentation and getting started guidance are available in the [Ed-Fi documentation](https://docs.ed-fi.org).
- **If you're using Enrollment API today**: Begin evaluating a migration to the Ed-Fi OneRoster API. The Enrollment API composite remains functional in ODS/API 7.3.x, giving you time to plan the transition. Contact the Ed-Fi Alliance help desk if you need guidance on migration timelines or technical planning.
- **Questions or concerns?**: Reach out to the Ed-Fi Alliance via the support contact form or your regional support channel.

See the blog post [Upcoming Ed-Fi OneRoster® Support in ODS/API 7.3.2](../../blog/2026-01-30.md) for more context on the OneRoster release and its integration with the ODS/API.
