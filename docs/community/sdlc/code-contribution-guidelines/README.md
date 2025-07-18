# Code Contribution Guidelines

## Overview

The Ed-Fi Alliance welcomes code contributions from the community. This
documentation provides guidelines for making contributions. Although the details
and examples that follow are focused on the Ed-Fi ODS / API, the same principles
and requirements are applicable to most Ed-Fi Alliance products.

In general, contributions will be released with the next scheduled product
release.  Exceptions include cases where contributions introduce breaking
changes, in which case they are rolled into the next major version release, and
cases where a timely change is needed for the current release (in which case the
Ed-Fi Alliance will create a new hotfix/minor release with the appropriate
change incorporated).

## License Agreements

All publicly available Ed-Fi source code is governed by the
[Apache License, version 2.0](https://www.apache.org/licenses/LICENSE-2.0).
Accepted code contributions will in turn be shared with the community under the
same terms.

In order to clarify the intellectual property license granted with contributions
from any person or entity, the Alliance must have a Contributor License
Agreement ("CLA") on file that has been signed by each Contributor, indicating
agreement to the license terms. This license is for your protection as a
Contributor as well as the protection of the Alliance and its users; it does not
change your rights to use your own Contributions for any other purpose.

Contributors commit to the CLA via click-through agreement when submitting a
pull request through GitHub.

:::tip

For the full text of the agreement,
see [Ed-Fi Individual Contributor License Agreement](../source-code-control-policy/)
in GitHub.
See [Ed-Fi Individual Contributor License Agreement](../source-code-control-policy/ed-fi-contributors-license-agreement)
for more information on the CLA.

:::

## Planning and Executing a Code Contribution

Whether a student looking for real world software projects to support or a large
multi-national corporation, and everything in between, there is room at the
table for you.

### Case / Issue Tracking

:::warning

As of September, 2024, most of the tickets in Ed-Fi Tracker are no longer
accessible to the general community. Please continue using the Community Hub and
try to coordinate with the respective product owner, where possible, to find out
what Jira key has been assigned for the issue you wish to work on.

:::

All code contributions must be linked to
an [Ed-Fi Tracker](https://tracker.ed-fi.org) ticket; for features and bugs
coming from the community, this means first creating a case in
the [Ed-Fi Community Hub](https://community.ed-fi.org). The support team will
review that case and create a ticket in Ed-Fi Tracker if there isn't a similar
ticket already.

It is a best practice to begin a discussion with the Product Owner and/or core
development team before beginning to work on a ticket. Simply post a new Comment
to begin the conversation, which will help uncover any architectural concerns
and implications for other work already in progress. The conversation should
include a tentative timeframe for completion so that the development team can
plan appropriately for the review process.

## Development Workflow and Standards

In order to contribute code, please follow this development process:

1. In the comments, ask to be assigned to be assigned to the Tracker ticket.
2. **Open source contributors**: Create a fork in GitHub and follow the
   [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)
   (external)
3. **Staff and contractors**: Create a branch off of the
   repository's `main` branch, following the
   [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). By
   convention, the Alliance uses the JIRA Issue ID as the branch name (e.g.,
   `ODS-3140`).
4. Commit your changes and push your changes to GitHub. Keep commits granular
   and specific, and they must be
   [signed](../source-code-control-policy/signing-git-commits). Multiple small
   commits are favored over a large commit. Do not include ticket numbers in the
   commit messages.
5. Create a pull request against the original repository's `main` branch. To
   ensure proper GitHub links in JIRA, pull requests should have the ticket
   numbers in brackets at the beginning of the title. The title should be a
   simple version of the addition, change, or fix. This is often similar to the
   title of the ticket (e.g., "\[ODS-3140\] PostgreSQL support for Identity
   Value Mappers").

![Diagram of the forking branch workflow](/img/sdlc/fork-branch-workflow.png)

An Ed-Fi development team member will review your pull request for the following
requirements:

1. The pull request has the Ed-Fi Tracker ticket.
2. The changes in the pull request follow the Alliance
   [coding standards](./coding-standards/).
3. The pull request meets the acceptance criteria as defined in the Ed-Fi
   Tracker ticket or as agreed on with the Product Owner.
4. The pull request includes appropriate unit test coverage and/or integration
   [test coverage](./testing-standards/).
5. The pull request changes should be
   [rebased](https://jeffkreeftmeijer.com/git-rebase/) onto the corresponding
   repository's `main` branch.
6. The revised code must pass all existing and new tests. Some tests take long
   time to run. The reviewer can run these tests on Ed-Fi build servers and
   provide feedback if the tests have passed or failed.

![Diagram of the Review Cycle](/img/sdlc/review-cycle.png)

:::tip

Google has a nice engineering practices guide to
[How to do a code review](https://google.github.io/eng-practices/review/reviewer/)
that is recommended reading for all developers contributing or reviewing Ed-Fi
code. There may be some Google-specific terminology mixed in there, but the
general principles are worth studying.

:::

### Multiple Repositories

In the case where changes for a ticket span multiple Git repositories, the pull
request will be merged into a feature branch first for testing and validation.
The reviewer will create a feature branch based on the
repository's `main` branch and then change the target of the pull request to
point to the feature branch. The reviewer then will merge the code, keeping the
commits in the feature branch until after review comments have been satisfied
and functional and unit tests are passing.

Once the above criteria are met, a final pull request will be submitted to move
the changes into the repository's `main` branch by the reviewer where the
multiple commits will be squashed into a single commit.

## Git Operations

### Learning Git

While incredibly powerful, Git can be a little daunting to learn. The following
tutorials are arranged from basic to more advanced.

* [tryGit](https://try.github.io/levels/1/challenges/1), an interactive
  tutorial.
* [Learn Git Branching](http://pcottle.github.io/learnGitBranching/), an
  interactive tutorial.
* [Pull Request Tutorial](https://github.com/yangsu/pull-request-tutorial), with
  many nice screenshots and some advanced functionality, such
  as _squash_, _rebase_, and _cherry-pick_.
* [Pro Git](https://git-scm.com/book/en/v2), the entire book, is available
  online for free.

### Git Security

* All members (staff and contractors) of the Ed-Fi-Alliance-OSS and Ed-Fi-Closed
  organizations must
  [enable Two-Factor Authentication (2FA)](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa)
  on their GitHub accounts.
  * Open source contributors, including on the Ed-Fi Exchange, do not require
    2FA. They will not be granted membership or direct write access in the
    repositories; instead they will need to fork the repository, make
    modifications in their forks, and then create the pull request from the fork
    back to the primary repository.
* All Git commits should be signed to prove authenticity.

:::tip

See [Signing Git Commits](../source-code-control-policy/signing-git-commits.md).

:::

### GUI Clients

Some users prefer to use a GUI client ("windows app") instead of or in addition
to the command line. Microsoft
[Visual Studio](https://visualstudio.microsoft.com/) and
[Visual Studio Code](https://code.visualstudio.com/) both contain robust
UI-based Git tools.

The Git web site has a list of
stand-alone [Git GUI Clients](https://git-scm.com/downloads/guis). Some commonly
used GUI clients by the ODS development team
include: [Source Tree](https://www.sourcetreeapp.com/), [Git Extensions](https://gitextensions.github.io/) and [Git Kraken](https://www.gitkraken.com/).
For diffs and merges the team primarily
uses [KDiff3](http://kdiff3.sourceforge.net/) or Visual Studio Code. However,
there are other tools available,
including [Meld](http://meldmerge.org/), [Diff Merge](http://www.diffmerge.net/),
and [Beyond Compare](https://www.scootersoftware.com/download.php).

The following command will setup KDiff3 as your default GUI for merges and
diffs:

```bash
git config --global --add merge.tool kdiff3
git config --global --add mergetool.kdiff3.path "C:/Program Files/KDiff3/kdiff3.exe"
git config --global --add mergetool.kdiff3.trustExitCode false

git config --global --add diff.guitool kdiff3
git config --global --add difftool.kdiff3.path "C:/Program Files/KDiff3/kdiff3.exe"
git config --global --add difftool.kdiff3.trustExitCode false
```

Further reading on Git can be found on the
Git [docs](https://git-scm.com/docs) site.

## Next Steps

You may wish to also review some or all of the following documents:

* [Coding Standards - General Principles](./coding-standards)
* [Testing Standards](./testing-standards)
* [Ed-Fi Software Development Lifecycle Home](../)

## Child Pages

import DocCardList from '@theme/DocCardList';

<DocCardList />
