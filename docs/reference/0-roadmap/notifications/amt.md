# Analytics Middle Tier Transitioning to Ed-Fi Exchange in 2025

Oct 11, 2023

## What is Happening

The next planned release of Analytics Middle Tier (AMT), version 4.1, will be
the last fully supported release. From that point, it will be in [maintenance
mode](./readme.md) until June, 2025. While in maintenance mode, new patch
releases will occur for critical bugs and security updates. In 2025, AMT will
move to the [Ed-Fi Exchange](https://exchange.ed-fi.org) and the source
repository will be set into archive, signaling that the application support has
formally ended.

## Why?

Analytics Middle Tier was designed to help report and application builders more
quickly develop solutions that directly access an ODS database. This is a
pattern that the Ed-Fi Alliance no longer encourages, for several reasons:

1. While the views in AMT are useful and achieve their objective, they create
   a _de facto_ alternate data model and API (albeit, a *database*API rather
   than a *web*API). The Ed-Fi Alliance is dedicated to promoting a single Data
   Standard and its related data model, via the web-based Ed-Fi API.
2. Direct database usage for reporting often create resource contention that can
   be harmful to transactional systems.
3. With the growth of large-scale deployments, where another organization
   manages the Ed-Fi API on behalf of an LEA, fewer and fewer organizations
   continue to have the right network access and permissions for direct database
   applications.

## Next Steps for Users

* No action required at this time.
* Watch for a release announcement about Analytics Middle Tier 4.1, which will
  work with .NET 8.
* Anyone wishing to continue using Analytics Middle Tier from 2025 and beyond is
  welcome to create a fork of the [source code
  repository](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier).
