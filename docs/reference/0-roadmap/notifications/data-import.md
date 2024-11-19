# Data Import Transitioning to Ed-Fi Exchange in 2026

Originally published: Dec 12, 2023

Updated: Jul 24, 2024 extended the maintenance window from summer 2025 to summer
2026.

## What is Happening

Data Import version 2.3 will be the last supported release of the application,
arriving in the second or third quarter of 2024. From that point, it will be
in [maintenance mode](./readme.md) until June 30, 2026. While in maintenance
mode, a new patch release will only occur for critical bugs and security
updates. In 2026, Data Import will move to the [Ed-Fi
Exchange](https://exchange.ed-fi.org) and the source repository will be set into
archive, signaling that the application support has formally ended.

## Why?

Data Import was developed as a stopgap to help move CSV files into an Ed-Fi
ODS/API when the vendor who created the CSV was unable/unwilling to build an
integration. This has been a useful tool for many scenarios; however, it sends a
mixed signal from the Ed-Fi Alliance. Ultimately, our aim is to bring vendors
into full integration with an Ed-Fi API.

Since Data Import was built, many new tools - frequently via cloud-based service
providers - have come onto the market that can do the same work or better as
Data Import. Furthermore, more and more Ed-Fi deployments are managed by
dedicated third parties, who have expertise in using their own toolkits for
loading file-based data into an Ed-Fi API. Thus, there exist viable alternatives
that do not require support and maintenance from the Alliance.

## Next Steps for Users

* Existing users: watch for a release announcement about Data Import version 2.3
* Anyone wishing to continue using Data Import from 2025 and beyond is welcome
  to create a fork of the [source code
  repository](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-DataImport).
