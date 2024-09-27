---
description: Transparency and improvement through automated scoring.
---

# Repository Scoring

## Broad Goals

- SUPPLY CHAIN: Secure the supply chain (access to code; the machines running
  the builds; dependency security).
- TRANSPARENCY: Provide transparency for development community, especially
  open source contributors.
- TESTING: Ensuring that every\* repository has some sort of unit test suite
  (\* there may be some exceptions, e.g. starter kits).
- QUALITY: Automating the code review and style guide.
- CONFIGURATION: Consistent repository configuration

## OSSF Scorecard

Beginning in March, 2024, the Ed-Fi Alliance will use the [OSSF
Scorecard](https://scorecard.dev) as our primary vehicle for scoring
repositories. The Alliance will also review the custom process created in 2022,
described below, to identify high priority items that are lacking in the OSSF
Scorecard. Any identified priorities will be added to a custom GitHub action
that can accompany the OSSF Scorecard.

The [LMS Toolkit](https://github.com/Ed-Fi-Exchange-OSS/LMS-Toolkit) repository
in the Ed-Fi Exchange serves as the initial proof of concept for how to
incorporate the Scorecard automation and for how to correctly configure the
repository and code.

### Known Divergences from OSSF

Generally, Ed-Fi code repositories will not have perfect scores; we may not
agree with OSSF on every detail. The scorecard provides transparency for third
parties to understand what we *do* agree upon. The following list explains some
of the more significant divergences from the OSSF recommendations. All of these
are subject to further review at a later date.

- Ed-Fi Alliance repositories typically require only **one code reviewer**;
  [OSSF recommends
  two](https://github.com/ossf/scorecard/blob/main/docs/checks.md#branch-protection).
- **Fuzzing**: the Alliance has not yet investigated adding fuzzing, and it
  does not appear that any of the suggested tools support .NET projects (the
  majority of the Ed-Fi Alliance code base)
- No attempt, at this time, to acquire an **OpenSSF Best Practices Badge**.
- **Packaging** will always be at zero, since the Alliance publishes packages
  through other avenues, not through GitHub.

### Tips for Preparing an Ed-Fi Alliance Repository

1. Ensure the following files are in the repository and have been setup
   correctly:

   1. .githbub/CODEOWNERS
   2. SECURITY.md
   3. .githbub/dependabot.yml

      1. ⚠️
         not applicable in repositories that do not contain source code /
         package dependencies

2. Review the repository security settings. Recommended:
   1. Private vulnerability reporting
   2. Dependency graph
   3. Dependabot
   4. Dependabot security updates
   5. Grouped security updates
   6. Secret scanning
   7. Access to alerts: grant to the assigned development team
3. Use a ruleset instead of branch protection ([Code Security
   Guidelines](../code-security-guidelines/README.md) contains
   a JSON file for import)
4. Copy `.github/``scorecard.yml` from LMS Toolkit
5. Explicitly set permissions in all existing Actions workflows

   1. At the workflow level, grant `readall`
   2. On any CodeQL job, add permission `security-events: write`

      :::warning

      A GitHub action with insufficient permissions will fail and
      it will tell you what is missing. Review that list carefully and
      update the workflow if everything requested is within reason.

      :::

## 2022 Process

:::danger[CAUTION]

As described above, this process is not in active use at this time,
but may be revisited in the future.

:::

### Checklist

Each criteria below implies that the job fails when something unexpected is
detected. These rules apply to all code in the Ed-Fi-Alliance,
Ed-Fi-Alliance-OSS, and Ed-Fi-Closed repositories, as well as Ed-Fi-Exchange-OSS
projects that are maintained by the Alliance software teams.

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Requirement</th>
      <th>Automation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Transparency</td>
      <td>Repository is using GitHub Actions</td>
      <td>There is at least one workflow file in the repo</td>
    </tr>
    <tr>
      <td>Supply Chain</td>
      <td>Detect known vulnerabilities in third-party dependencies</td>
      <td>Scan for use of dependabot</td>
    </tr>
    <tr>
      <td>Supply Chain</td>
      <td>Prevent use of unauthorized GitHub actions</td>
      <td>Scan for use of the alloweddlist action</td>
    </tr>
    <tr>
      <td>Testing</td>
      <td>Run unit tests</td>
      <td>Look for a workflow step called “Run Unit Tests” (*)</td>
    </tr>
    <tr>
      <td>Testing</td>
      <td>Report unit test results</td>
      <td>Look for the dorny test reporter</td>
    </tr>
    <tr>
      <td>Testing</td>
      <td>Runs a static application security testing (SAST) tool</td>
      <td>Scan for use of CodeQL</td>
    </tr>
    <tr>
      <td>Supply Chain</td>
      <td>Release binaries are only published from `main` branch</td>
      <td>Look for a workflow that only triggers on merge to main and includes a step called "Publish Release Package". (**)</td>
    </tr>
    <tr>
      <td>Quality, Transparency</td>
      <td>Run a linter</td>
      <td>Look for a workflow step called “Run Linter”</td>
    </tr>
    <tr>
      <td>Supply Chain, Configuration</td>
      <td>Branch protection on main requires pull request</td>
      <td>
        <a href="https://docs.github.com/en/rest/reference/branches#get-branch-protection">API Call</a> or use GraphQL
      </td>
    </tr>
    <tr>
      <td>Transparency, Supply Chain</td>
      <td>... requires code review</td>
      <td>use results from API call above</td>
    </tr>
    <tr>
      <td>Supply Chain</td>
      <td>... requires signed commits</td>
      <td>use results from API call above</td>
    </tr>
    <tr>
      <td>Supply Chain</td>
      <td>No high or severe dependabot alerts open more than 3 weeks in `main` branch</td>
      <td>
<details>
  <summary><strong>GraphQL</strong></summary>

  ```graphql
POST https://api.github.com/graphql

{
  repository(name: "Roster-Starter-Kit-for-Vendors", owner: "Ed-Fi-Alliance-OSS") {
    vulnerabilityAlerts(first: 100) {
      nodes {
        createdAt
        dismissedAt
        securityVulnerability {
          package {
            name
          }
          advisory {
            description
            severity
          }
        }
      }
    }
  }
}

  ```

</details>
<details>
  <summary><strong>Sample result</strong></summary>

  ```json
  {
  "data": {
    "repository": {
      "vulnerabilityAlerts": {
        "nodes": [
          {
            "createdAt": "2021-07-14T20:19:37Z",
            "dismissedAt": null,
            "securityVulnerability": {
              "package": {
                "name": "RestSharp"
              },
              "advisory": {
                "description": "RestSharp < 106.11.8-alpha.0.13 uses a regular expression which is vulnerable to Regular Expression Denial of Service (ReDoS) when converting strings into DateTimes. If a server responds with a malicious string, the client using RestSharp will be stuck processing it for an exceedingly long time. Thus the remote server can trigger Denial of Service.",
                "severity": "HIGH"
              }
            }
          },
          {
            "createdAt": "2021-07-14T20:19:37Z",
            "dismissedAt": null,
            "securityVulnerability": {
              "package": {
                "name": "RestSharp"
              },
              "advisory": {
                "description": "RestSharp < 106.11.8-alpha.0.13 uses a regular expression which is vulnerable to Regular Expression Denial of Service (ReDoS) when converting strings into DateTimes. If a server responds with a malicious string, the client using RestSharp will be stuck processing it for an exceedingly long time. Thus the remote server can trigger Denial of Service.",
                "severity": "HIGH"
              }
            }
          }
        ]
      }
    }
  }
}
  ```

</details>
      </td>
    </tr>
    <tr>
      <td>Transparency</td>
      <td>
        Repository includes minimal file list:
        <ul>
          <li>README.md</li>
          <li>LICENSE</li>
          <li>NOTICES.md</li>
          <li>CONTRIBUTORS.md</li>
        </ul>
      </td>
      <td>Should be easy enough</td>
    </tr>
    <tr>
      <td>Configuration</td>
      <td>
        <p>Disable: wiki, issues, projects, sponsorships, discussions</p>
        <p>Enabled:</p>
          <ul>
            <li>delete head branch</li>
            <li>squash merge</li>
            <li>has license information</li>
          </ul>
      </td>
      <td>GraphQL</td>
    </tr>
    <tr>
      <td>Transparency</td>
      <td>Uses Releases</td>
      <td>GraphQL</td>
    </tr>
  </tbody>
</table>

**\* Unit Testing, Linting**

Again difficult to enforce except through name standardization. Obviously there
will just be at trust factor here.

**\*\* Release Publishing**

All "binary" releases should be published from GitHub Actions, and no one should
be publishing from their computer. Not something we can really automate, except
perhaps to look for a job step with a standardized name, which runs only on
merge to the main branch.

## Automation Process

We have a Python application in
[https://github.com/Ed-Fi-Alliance-OSS/DevSecOps](https://github.com/Ed-Fi-Alliance-OSS/DevSecOps)
("edfi-repo-auditor") to perform the scoring. There is a GitHub Actions job to
run the process; however, as of 18 Nov 2022 we do not want to use that. The
personal access token that we can safely make available to that repository has
insufficient permissions. This needs to be run with a PAT from an Owner account
in GitHub (tech team member). That means it needs to be run locally.
