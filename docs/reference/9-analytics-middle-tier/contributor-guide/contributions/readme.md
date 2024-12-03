# Analytics Middle Tier Contributions

## Overview

The Analytics Middle Tier (AMT) will truly come into its own as it grows to
incorporate more community-driven use cases. Optimally, those use cases will be
implemented and shared by community members. The following sections will help
you get started on sharing your SQL code for the AMT.

If you have an idea, but do not have the means for developing it, we still want
to hear from you: please create a Tracker ticket as described in step 1 of
the [Contribution
Process](http://techdocs.ed-fi.org/#contribution-process) below.

## Planning Your Contribution

Please review the following documentation to learn how to make a high-quality
contribution of new views or sample scripts for the AMT:

* [AMT Standards and
    Guidelines](https://edfi.atlassian.net/wiki/display/EDFITOOLS/AMT+Standards+and+Guidelines)
* [Unit Test
    Framework](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Unit+Test+Framework) (AMT-specific)
* [Code Contribution
    Guidelines](https://edfi.atlassian.net/wiki/display/ETKB/Code+Contribution+Guidelines) (applies
    to all Ed-Fi source code)

:::tip The Slack

[#dev-analytics-middle-tier](https://ed-fi-alliance.slack.com/archives/CS82215JB)
channel is a great place to discuss new ideas before committing them to
Tracker.

:::

## Contribution Process

1. Fork the [Analytics Middle Tier
    repository](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier) in
    GitHub. You will be pushing your changes to your fork, and then making a
    pull request into the official repository.
2. Create a ticket in the [BIA project](https://tracker.ed-fi.org/browse/BIA).
    1. Bugs: please be sure document the problem, how to recreate the problem,
        expected response, actual response, and the version.
    2. New view: create as a User Story. Please describe the use case in as
        much detail as possible so that we can understand what to expect and how
        to help you integrate your view(s) either into the Core Collection or a
        use case-specific collection.
3. The Ed-Fi development team will respond to the ticket in Tracker.
    1. If you're creating a new [use case
        collection](https://edfi.atlassian.net/wiki/display/EDFITOOLS/AMT+Collections),
        the Ed-FI team will suggest a short code name for that collection (e.g.,
        "ews" for the Early Warning System collection).
4. Develop your code.
    1. Be sure to follow the [AMT Standards and
        Guidelines](https://edfi.atlassian.net/wiki/display/EDFITOOLS/AMT+Standards+and+Guidelines) to
        the best of your ability. This will ensure a smooth acceptance process.
    2. When ready, follow the GitHub pull request process described in [Code
        Contribution
        Guidelines](https://edfi.atlassian.net/wiki/display/ETKB/Code+Contribution+Guidelines).
5. Once accepted, the Ed-Fi development team will incorporate your pull request
    into the code base as its earliest opportunity.
6. As a community contributor, you will not have access to write documentation
    directly in our Tech Docs site. The Ed-Fi development team will work with
    you to translate the Tracker ticket into new documentation under the [AMT
    Collections](https://edfi.atlassian.net/wiki/display/EDFITOOLS/AMT+Collections) section
    of Tech Docs.
7. After your contribution is merged, we will include it in the next release of
    the AMT.
    1. Because the AMT uses a strict definition of [Semantic Versioning
        2.0.0](https://semver.org/#semantic-versioning-200), we can produce new
        releases frequently and end-users will know by the major version number
        if there are any breaking changes to be concerned about.
