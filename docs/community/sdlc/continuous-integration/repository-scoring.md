---
description: Transparency and improvement through automated scoring.
---

# Repository Scoring

## Broad Goals

* SUPPLY CHAIN: Secure the supply chain (access to code; the machines running
  the builds; dependency security).
* TRANSPARENCY: Provide transparency for development community, especially open
  source contributors.
* TESTING: Ensuring that every\* repository has some sort of unit test suite (\*
  there may be some exceptions, e.g. starter kits).
* QUALITY: Automating the code review and style guide.
* CONFIGURATION: Consistent repository configuration

## OSSF Scorecard

The Ed-Fi Alliance uses the [OSSF Scorecard](https://scorecard.dev) as our
primary vehicle for scoring repositories. The
[LMS Toolkit](https://github.com/Ed-Fi-Exchange-OSS/LMS-Toolkit) repository in
the Ed-Fi Exchange served as the initial proof of concept for how to incorporate
the Scorecard automation and for how to correctly configure the repository and
code.

## Known Divergences from OSSF Best Practices

Generally, Ed-Fi code repositories will not have perfect scores; we may not
agree with OSSF on every detail. The scorecard provides transparency for third
parties to understand what we _do_ agree upon. The following list explains some
of the more significant divergences from the OSSF recommendations. All of these
are subject to further review at a later date.

* Ed-Fi Alliance repositories typically require only **one code reviewer**;
  [OSSF recommends two](https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection).
* **Fuzzing**: the Alliance has not yet investigated adding fuzzing, and it does
  not appear that any of the suggested tools support .NET projects (the majority
  of the Ed-Fi Alliance code base)
* No attempt, at this time, to acquire an **OpenSSF Best Practices Badge**.
* **Packaging** will always be at zero, since the Alliance publishes packages
  through other avenues, not through GitHub.

## Tips for Preparing an Ed-Fi Alliance Repository

1. Ensure the following files are in the repository and have been setup
   correctly:

   1. `.githbub/CODEOWNERS`
   2. SECURITY.md
   3. `.githbub/dependabot.yml`

      :::note

      `dependabot.yml` is not necessary in repositories that do not contain
      source code / package dependencies

      :::

2. Review the repository security settings. Recommended:
   1. Private vulnerability reporting
   2. Dependency graph
   3. Dependabot
   4. Dependabot security updates
   5. Grouped security updates
   6. Secret scanning
   7. Access to alerts: grant to the assigned development team
3. Use a ruleset instead of branch protection
   ([Code Security Guidelines](./code-security-guidelines) contains a JSON file
   for import)
4. Copy `.github/scorecard.yml` from LMS Toolkit
5. Explicitly set permissions in all existing Actions workflows

   1. At the workflow level, grant `readall`
   2. On any CodeQL job, add permission `security-events: write`

      :::warning

      A GitHub action with insufficient permissions will fail and it will tell
      you what is missing. Review that list carefully and update the workflow if
      everything requested is within reason.

      :::
