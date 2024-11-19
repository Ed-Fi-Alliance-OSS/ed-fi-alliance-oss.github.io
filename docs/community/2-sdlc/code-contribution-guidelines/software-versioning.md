# Software Versioning

The Ed-Fi Community produces a lot of software utilizing the Ed-Fi Data
Standard. But there are [multiple standards](/reference/data-exchange); they are
versioned. And the various software components and tools are versioned. How do
we make sense of all of this? Through use of
[semantic versioning](https://www.semver.org) (semver) and, in some cases, a
_Suite Number_.

Also see:

* [Ed-Fi Technical Suite Version  Matrix](/reference/roadmap/supported-versions)
* [Ed-Fi Data Standard Versioning and Releases](/reference/data-exchange/versioning-and-releases)
* [Open Source and New
  Versioning](https://www.ed-fi.org/blog/2020/05/open-source-and-new-versioning/)
  (blog)

## Semantic Version

All tools released through the Ed-Fi Alliance should at minimum have a semantic
version with three part number: x.y.z, where:

* x: major version, which increments when there is a change that breaks
  compatibility.
* y: minor version, which changes when a new feature is added in a
  backward-compatible way.
* z: patch version, which changes when a bug is fixed or usability is improved
  without adding new features or breaking compatibility.

Anyone wishing to integrate another software product with an Ed-Fi tool will
know that an upgrade to that tool should be safe if the patch or minor version
number changes, while recognizing that an upgrade with a major version number
bump will require careful evaluation to determine and mitigate the impact of
breaking changes.

## Suite Number

In 2018, the Alliance introduced the concept of Technical Suites, that represent
a generation of technology products that share a data model and are designed to
work together. See [Ed-Fi Technology Suite Supported
Versions](/reference/roadmap/supported-versions).

Integrating the Suite Number into the versioning scheme was introduced in
mid-2020; prior to this, an Ed-Fi ODS/API release was given only a plain version
number, where the first digit corresponded to the Data Standard version. This
was confusing and did not fit well with Semantic Versioning. For example, when
Ed-Fi ODS/API 3.4 was released (full semver: 3.4.0), the Alliance knew that the
next software release would have breaking changes in it, although the supported
_data standard_ would not.

In the previous convention, bumping the next release number from 3.4 to 4.0
would be confusing, as people would think that there was a corresponding release
of a Data Standard 4.0 (there is no such thing!). So we introduced the _suite
number_ to indicate the major version of the Data Standard. Effectively, we went
from 3.4 to 3.5 and moved the "3" over to the suite version: Ed-Fi ODS/API for
Suite 3, version 5.0.

:::tip

While every release has a patch version, it might not be mentioned prominently
in documentation. Furthermore, the number may change frequently during the
development process, so that the formal "release" of a minor update might have a
patch version greater than 0. For example, the release of a "version 2.3" of
some application might technically be "2.3.7". The 7 would be seen at a
technical level, in the downloaded artifacts, but is not always worth
documenting. When semantically versioned software has multiple releases that
differ only by patch number, it is generally best to install the latest patch
version.

:::
