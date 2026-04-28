---
sidebar_position: 5
---

# OneRoster® Conformance

The Ed-Fi OneRoster service is certified by 1EdTech® against the
OneRoster v1.2 Rostering Core service. The certification covers the
rostering endpoints that make up the Core service; the
`/demographics` endpoint is implemented but is not in the certified
scope.

<!--
Review (Vinaya): confirm and paste the 1EdTech certified-products
directory URL for the Ed-Fi OneRoster service here, along with the
formal certification date and certification identifier if one is
issued by 1EdTech. The page currently says "certified" without
pointing to the directory entry.
-->

## Certified scope

The Rostering Core service covers the endpoints below. Each is
implemented by the Ed-Fi OneRoster service and passes the 1EdTech
conformance tests against a populated Ed-Fi ODS.

| OneRoster v1.2 endpoint | Certified |
| --- | --- |
| `/academicSessions`, `/academicSessions/{id}` | Yes (Rostering Core) |
| `/classes`, `/classes/{id}` | Yes (Rostering Core) |
| `/courses`, `/courses/{id}` | Yes (Rostering Core) |
| `/enrollments`, `/enrollments/{id}` | Yes (Rostering Core) |
| `/gradingPeriods`, `/gradingPeriods/{id}` | Yes (Rostering Core) |
| `/orgs`, `/orgs/{id}` | Yes (Rostering Core) |
| `/schools`, `/schools/{id}` | Yes (Rostering Core) |
| `/students`, `/students/{id}` | Yes (Rostering Core) |
| `/teachers`, `/teachers/{id}` | Yes (Rostering Core) |
| `/terms`, `/terms/{id}` | Yes (Rostering Core) |
| `/users`, `/users/{id}` | Yes (Rostering Core) |
| `/demographics`, `/demographics/{id}` | Implemented, not in the Rostering Core certification |

For the Ed-Fi source mapping of each endpoint, see [Endpoint to
Ed-Fi source mapping](./data-model/endpoint-source-mapping.md).

## Reproducing conformance on your own deployment

The 1EdTech OneRoster v1.2 conformance test suite exercises each
Rostering Core endpoint against a populated deployment. To reproduce
the conformance result on your environment:

1. **Deploy an Ed-Fi ODS with populated data.** The Ed-Fi Grand Bend
   reference dataset is the recommended starting point.
2. **Load the conformance augmentation.** The stock Grand Bend
   dataset does not contain Ed-Fi session rows whose
   `TermDescriptor` maps to OneRoster `terms` or `gradingPeriods`.
   The OneRoster service repository ships supplemental session data
   under `tests/grand-bend-augmentation/`:

   - `sessions.jsonl` — additional Ed-Fi session records that
     exercise the `terms` and `gradingPeriods` code paths.
   - `lightbeam.yml` — configuration for the
     [`lightbeam`](https://github.com/edanalytics/lightbeam) CLI to
     post those records into the Ed-Fi ODS API.

   Without this augmentation the `/terms` and `/gradingPeriods`
   endpoints return empty result sets against Grand Bend and the
   conformance suite will flag them.
3. **Refresh the OneRoster views.** The refresh job materializes the
   new session rows into `oneroster12.academicsessions` so the API
   can return them. See [Database engines](./getting-started/readme.mdx#database-engines)
   for the PostgreSQL and SQL Server refresh mechanics.
4. **Deploy the OneRoster service** against the populated ODS. Any
   of the paths under [Getting
   Started](./getting-started/readme.mdx) works.
5. **Run the conformance tests through the 1EdTech Build platform.**
   1EdTech members run the OneRoster v1.2 Rostering conformance
   suite against their deployment at
   [build.1edtech.org](https://build.1edtech.org/).
