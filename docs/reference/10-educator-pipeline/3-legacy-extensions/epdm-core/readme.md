---
sidebar_position: 1
---

# Legacy EPDM Core

:::warning Legacy Content

This page documents **EPDM Core**, which was an extension of the Ed-Fi ODS/API bundled
with the ODS/API platform. Starting with **Data Standard v6 (November 2025)**, EPDM is
integrated into the Ed-Fi core standard and no longer requires a separate extension. See
the [Migration Guide](../../migration-guide-epdm-to-ds6.md) for transition guidance.

:::

The Educator Preparation Data Model (Core edition, colloquially EPDM-Core) is an
extension to the Ed-Fi Data Standard that captures data allowing an Educator Preparation
Provider (EPP) to understand and answer key questions relating to educator candidate
development. EPDM-Core was installed by default starting with ODS/API v5.3 and received full support from Ed-Fi Core.

EPDM-Core contains models for the following data:

- Candidate demographics
- Program data (available programs and enrollment)
- Achieved credentials
- Rubric-based evaluations

## Relationship to EPDM-Community

EPDM-Core is a strict subset of EPDM-Community. It was introduced in v1.1 alongside the
renaming of the full model to EPDM-Community. Organizations needing the full feature set
(recruitment and staffing, expanded credentials, path domain, etc.) used EPDM-Community
instead.

If you started with EPDM-Core and later needed EPDM-Community, migration required
installing a new ODS/API instance using the EPDM-Community extension. Since EPDM-Core
was a strict subset, existing data could be reloaded without changes.

## Further Information

EPDM-Core was managed by the Ed-Fi Data Standard team. For current information, see
[V6 Ed-Fi Data Standard EPDM Related Domains](../../v6-epdm-related-domains.md).
