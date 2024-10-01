# Ed-Fi Contributor's License Agreement

## Problem Statement

We need to ensure that contributors are actively declaring that they own the
copyright or have permission to contribute the code changes in their pull
requests.

## Solution

Use [CLA assistant (cla-assistant.io)](https://cla-assistant.io/), freely
managed by SAS, to track acceptance of an Ed-Fi Contributor’s License Agreement
(CLA). The agreement is [stored as a
Gist](https://gist.github.com/EdFiBuildAgent/d68fa602d07505c3682e8258b7dc6fbc)
in GitHub, owned by the shared EdFiBuildAgent account.

The CLA assistant adds webhooks into repositories, detecting when a pull request
is made. The process then checks to see if the contributor has clicked through
to agree on the CLA yet. If not, it prompts them to do so. If they have signed
already, then it adds a badge to the pull request.

## Administration

[Common
Issues](https://github.com/cla-assistant/cla-assistant/blob/main/COMMON_ISSUES.md)
(cla-assistant document on github)

Administrators can sign-in to the CLA assistant with a GitHub account.

First time use: after signing-in, click “Link to a repository”. Then click the
“want to link to an org?” link. This will authorize connecting to existing
organizations. If the user has administrative rights in GitHub, then they will
be able to see and manage the settings for all of the repositories. They can
also see exactly who has “signed” the CLA. Currently the `Ed-Fi-Owner` shared
github account is already linked to the three active organizations.

The following bots have been excluded from the CLA process: `dependabot[bot]`,
`github-actions[bot]`

## Private Repositories

Although we have not seen documentation about this, it does not look like the
CLA process is working for private repositories. This is acceptable, since the
private repositories are usually only accessed by staff and consultants. The
contract language signed by the consultants' employer covers the same
requirements; additionally, most of the consultants contributing to a private
repository will have also contributed to a public repository, where they will
have already clicked through the agreement.
