---
description: Guidance for open- and closed-source projects.
---

# Dependency Security Automation

## Overview

Most Ed-Fi software projects involve the use of pre-packaged libraries or
packages, collectively referred to as "dependencies". These are potentially
vulnerable to supply chain attacks: a malicious agent hijacks a the dependency,
injecting malicious code. Then an unwitting downstream user (such as the Ed-Fi
Alliance) uses that malicious version of the dependency, distributes it to
others, and thus infects all of _its_  users. We must do all we can to prevent
that.

:::tip

Also see
[Guidelines for Use of GitHub Actions](./guidelines-for-use-of-github-actions.md)
for further notes on automating dependency scanning.

:::

## GitHub Actions

Third party GitHub Actions used by Ed-Fi workflows are potential vectors for
attacks. The Alliance will automatically trust all Actions published by GitHub
under the "actions" organization (example: "actions/cache"). Other actions
should reviewed by the Ed-Fi tech team before they are approved for us. This
review should be a deep inspection of the source code. Furthermore, GitHub
Actions should utilize commit hashes instead of version numbers, thus pinning to
the reviewed code. These practices are enforced by scanning the Actions
workflows themselves to ensure that they are only using pre-approved Actions.

_Also see
[Guidelines for Use of GitHub Actions](./guidelines-for-use-of-github-actions)_.

## Open Source Projects

All open source projects should:

1. Enable
   [Dependabot](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide),
   and
2. Run the
   [Dependency Review Action](https://github.com/actions/dependency-review-action)
   on pull requests

These are essentially the same underlying technologies. Dependabot runs a
nightly scan on the `main`  branch of the code and reports on any
newly-discovered vulnerabilities. The Dependency Review Action ensures that a
pull request is not pulling in any new vulnerabilities.

## Closed Source

Closed source projects should also enable Dependabot. However, they cannot used
use the Dependency Review Action, per the GitHub licenses for those tools.

MetaEd should utilize the `npm audit`  command on pull requests. As described in
[Improve Your TypeScript with Static Analysis](https://nikgrozev.com/2020/03/22/improve-your-typescript-with-static-analysis/#dep-audit),
the `audit-ci`  package may be useful for improving the message experience.
