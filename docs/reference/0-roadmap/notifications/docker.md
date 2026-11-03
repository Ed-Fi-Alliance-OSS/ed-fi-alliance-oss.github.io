# Docker Deployments Transitioning to Ed-Fi Community Tools

First published: 3 November 2026

## What is Happening

The [Ed-Fi ODS/API Docker deployments](/reference/docker) are no longer
maintained as part of the Ed-Fi Alliance Technology Suite. They are moving to
[Ed-Fi Community Tools](/getting-started/community-tools). All Docker
deployment releases are now [out of support](./readme.mdx).

The Ed-Fi Alliance may still update the Docker deployments from time to time,
but does not commit to maintaining them or to releasing them alongside new
versions of the Ed-Fi ODS/API, Ed-Fi ODS Admin API, Ed-Fi Admin App, or Ed-Fi
API.

## Why?

The Docker Compose scripts are demonstrations. They provide a quick way to run a
local testing environment, and they are not production components. Releases
have not kept pace with the components they deploy, and the Docker release
numbers track which components are in the kit rather than the versions of those
components. Listing the Docker deployments as a supported product signaled a
commitment that the Alliance has not been able to meet.

## Next Steps for Users

- Continue to use the Docker deployments for local testing and demonstrations.
  Check the [release
  notes](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Docker/releases) to see
  which component versions each release deploys.
- Do not use the Docker deployments as a production deployment. See [Ed-Fi
  Technology Suite Supported
  Versions](/reference/roadmap/supported-versions) for the supported versions of
  each product.
- Anyone who needs a maintained Docker deployment is welcome to create a fork of
  the [source code
  repository](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Docker).
