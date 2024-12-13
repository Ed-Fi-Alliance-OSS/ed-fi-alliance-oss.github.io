# SDKs and Development APIs

:::info Key Concepts

* Ed-Fi's technology efforts use Swagger/OpenAPI code generation to allow developers to generate SDKs for their platform of choice.
* If you are working on an API client for an API that has been extended, you will need to get the Swagger/OpenAPI definition from the API host.

:::

## Software Development Kits

Software Development Kits (SDKs) can be very useful for developers of API clients.  For those technology providers connecting to an API implemented by the Ed-Fi ODS API, there are instructions for generating an SDK.

* [Using Code Generation to Create an SDK](/reference/ods-api/client-developers-guide/using-code-generation-to-create-an-sdk)

The Ed-Fi ODS API generation process uses OpenAPI (or OpenAPI's predecessor, Swagger) specification files to generate the SDK.

Accordingly if the API implementer has extended the API you are connecting to, you will need to get the OpenAPI specification from the API host in order to generate an SDK that has the extensions included.

## Cloud Deployments of the ODS API

In developing, it can be very helpful to have an actual API to work against. In the section, [Getting Started with Ed-Fi APIs](../implementation/getting-started-with-apis/readme.md), you were introduced to the **Ed-Fi ODS / API sandbox** at [https://api.ed-fi.org/](https://api.ed-fi.org/) which is a public service for experimenting with Ed-Fi APIs.

However, it is **not** appropriate to introduce the **Ed-Fi ODS/API sandbox** into your development or QA processes. To assist you in those processes, there are some cloud-based deployments that simplify the process of installing a cloud-based version of the Ed-Fi ODS/API, which you can then use for your internal development work.

A few notes:

* Please note that these installers are community-maintained, so may not track the latest versions of the APIs.
* These installers produce a non-extended Ed-Fi API (see section [API Extensions](../../provider-playbook/implementation/ed-fi-api-fundamentals/api-extensions.md)). If the API you are using is extended, you will need to work with the API host on resources to support your development.

These cloud-based installers are available on the [Ed-Fi Exchange](https://exchange.ed-fi.org/):

* [AWS](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=22492394)
* [Azure](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=22487832)
* [Google Cloud](https://edfi.atlassian.net/wiki/display/EXCHANGE/How+To%3A+Run+Ed-Fi+on+Google+Cloud)
