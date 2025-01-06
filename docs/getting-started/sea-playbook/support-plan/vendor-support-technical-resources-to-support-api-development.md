# Vendor Support - Technical Resources to Support API Development

## Overview

Vendors in your state or region will need technical assets to help them implement Ed-Fi. Below is a list of resources we strongly recommend you provide, a description of each, and a brief note on why it is important.

## API Sandbox & Open API Document (Swagger)

The API sandbox allows technology providers to interact with an actual API. It consists of 3 parts:

1. A Swagger interface, which is powered by an Open API document. This interface shows a human visually how the API works (what actions are allowed, what the data payloads look like, what standards error codes mean, etc.).
2. An API implementation. The Swagger interface connects to an actual API implementation, so vendors can see what sent/received payloads look like.
3. A version endpoint, which distributes key information for technology providers on how to setup local copies of the API for their internal work.

We recommend clarifying for technology providers that they should NOT use this resource in their actual development work. Instead, they should use this interface to support their learning.  

To support their development work, they should setup their own internal API implementations (read below for more).

The Swagger interface should also accurately show the Ed-Fi ODS and API versions; this is important to allow technology providers to setup their own APIs for development.  

## Software Development Kit (SDK)

An SDK is a software code library that a technology provider or developer can install that assists with API integration. Technology providers will usually expect an API host to distribute SDKs, which are software language specific. You may have to do some research with developers to determine which languages are the most helpful to them.

An additional benefit of publishing the Open API documents (see above) is that this document will allow technology providers, who may need an SDK in a language you don’t support, to generate their own.

## Read Access to All Descriptors via API Sandbox

Technology providers will need to know about the required descriptors supported by the API host. We strongly recommend that the API Sandbox provide read access to all descriptors and be the canonical place from which a vendor can load descriptors.

Note that in some cases, an API host may allow certain vendors to write descriptors. This is somewhat rare. If it is supported, it is important for the state to cover this expectation in their vendor documentation (i.e., for which descriptors can values be written, in what namespaces, and by which categories of vendors).

## MetaEd Files

If your implementation has extensions, we strongly recommend publishing the MetaEd files that were used to generate these extensions. There are several use cases for this.

* **Allows vendors to build and maintain an API in their development environment.** These files are used by vendors in conjunction with the Ed-Fi ODS technology to generate copies of the API surface (copies that are most likely, but not necessarily near replicas) that can used to support their internal development. Even in the case where the API is not an exact replica, the files provide precise technical guidance about data model extensions.
* **Supports multi-level state data architectures.** In some states, data will not be sourced directly from a SIS, but come from a ODS that is managed by a school district or even an education service agency. There are also less common cases where it flows from a state via API to a ODS. In these architectures (the first cases is diagrammed below), the owner of the API wants to ensure that it is as close to the SEA's Ed-Fi API as possible, as the movement of data between these levels is automated.

![Integrated State Model](https://edfi.atlassian.net/wiki/download/thumbnails/22907869/Integrated%20State%20Model.png?version=2&modificationDate=1699633271937&cacheVersion=1&api=v2&width=690&height=500)

Figure 1. A multi-level architecture involving multiple APIs that need to match

## Claimset Exports

Claimsets define the authorization configuration for API access. These can be exported by using Ed-Fi’s Admin App. Publishing these allows technology providers to mirror the authorization behavior of the API surface, helping them to be able to test against an exact copy of the API.

## Guidance or Benchmarks on API Performance  

This guidance can be more difficult to publish, but if possible we recommend it.  

Vendors, particularly new vendors, often have many questions about how much data they can send and how quickly they can send it without overwhelming the API. Can I send 500 transactions a minute? 1000? At what point – if any -- will the API become unresponsive?

When data exchange is asynchronous, this is less of an issue; however, one of Ed-Fi’s greatest benefits is that it is a synchronous technology focusing on near-real-time data, and in that context, it can be very helpful to understand and publish the capacity of the API host to handle transactions.

If possible, states should work to analyze API capacity and assist vendors with guidance on what to expect. This not only helps technology providers plan ahead, but also helps the state or agency hosting the API by helping the vendor ecosystem stay within capacity guidelines, thus ensuring the smooth operation of the API.
