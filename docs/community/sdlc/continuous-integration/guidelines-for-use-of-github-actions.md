---
description: Goals, best practices, and policies.
---

# Guidelines for Use of GitHub Actions

## Introduction

Since 2022, the Ed-Fi Alliance is increasingly relying on GitHub Actions as its
continuous integration (CI) environment. Because it is a cloud-based service,
VPN access is not required for accessing the CI jobs. And as a cloud-based
service, Ed-Fi does not need to maintain its own virtual machines for running
these build processes.

One of the compelling features about GitHub Actions is the re-use of packaged
components: Actions. Some of these are built by GitHub and some by
third-parties. These components offer shortcuts for accomplishing common tasks,
thus greatly increasing the efficiency of the Ed-Fi development team. However,
there is a potential cost to them. If used incorrectly, they could enable
inappropriate code to run during the CI process. For example, one could imagine
a malicious Action that attempts to inject malware into the source code.

As part of the "code pipeline security 2022" project, the Alliance needs to
establish clear guidelines / expectations for correct usage of GitHub Actions. A
central tenant of that project is automation: code pipeline security should not
be left to chance, relying on human intervention to notice and stop
inappropriate usage of this powerful tool.

While primarily dedicated to security, this document will also cover best
practices.

## Goals

1. Document expectations for **secure** usage of GitHub Actions.
2. Provide recommendations for general **best practices**.
3. Provide an automated tool for monitoring GitHub Actions configurations in
   Ed-Fi code repositories.

## References

(external)
[Security Hardening for GitHub Actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

## Authoring GitHub Actions in a Repository

### Summary of Policies and Best Practices

* Only uses "3rd party" actions that are in the
  [approved.json](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Actions/blob/main/action-allowedlist/approved.json).
  * Collaborate with an Ed-Fi Tech Team member if you would like to bring in a
    new action or a new version of a previously-trusted action.
* Most repositories will have separate workflows for these tasks:
  1. Dependency Review (mandatory)
  2. Code Review (mandatory)
  3. Build and Test
  4. Publish
* Minimize build time by using dependency caching and not performing unnecessary
  steps (e.g. rebuilding already built code).
* Fail fast... and make sure the failure is obvious / easy to diagnose.
* For new repositories, start with automation before code is developed
  (security-driven development, like test- or behavior-driven development).
* For any workflows that publish packages, do not add the publish step to the
  workflow until you are sure the package being created is correct
  * This ensures that any packages that end up in Azure Artifacts are correct
    and not erroneous ones built before the workflow was complete.
  * You can utilize the approved upload-artifact action to upload the package to
    the build results so you can view it there to confirm if it is correct or
    not.
* Build once and reuse is always a good idea. When temporarily storing build
  output as an artifact for download in another job, specify the exact commit
  hash or run id of the artifacts to download.

### Examples

* All

  * **[Dependency Scan](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/blob/main/.github/workflows/dependencies.yml)**
  * Safe download of artifacts

    ```yml title="Example"
    # This uses the commit hash to specify exactly which process to download from.

    - name:
        Download
        SandboxAdmin,SwaggerUI,WebApi,Databases,EdFi.Ods.Api.Sdk,EdFi.SdkGen
        NugetPackages
      uses: dawidd6/action-download-artifact@1cf11afe3f1874cee82a8d5a2b45c0fd63f0fa22 #v2.19.0
      with:
        workflow: InitDev,Unit tests,Integration tests,Package.yml
        workflow_conclusion: success
        name: NugetPackages.Artifacts
        path: ${{ github.workspace }}/Ed-Fi-ODS-Implementation/NugetPackages/
        commit: ${{ env.INITDEV_COMMIT }}
        check_artifacts: true
        if_no_artifact_found: fail
    ```

* Dotnet
  * [Admin App: **Build and Test**](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp/blob/main/.github/workflows/build.yml)
  * [Admin App: **Integration Testing**](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-AdminApp/blob/main/.github/workflows/e2e.yml)
    * Interestingly, demonstrates starting up the ODS/API and Admin App in
      Docker
  * [Analytics Middle Tier: **Build and Test**](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier/blob/main/.github/workflows/build.yml)
  * [Analytics Middle Tier: **Publish Zip File to GitHub Release**](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier/blob/main/.github/workflows/create-pre-release.yml)
    * Most projects publish library packages to Azure Artifacts or PyPi, but AMT
      publishes a zip file with command-line executable, using GitHub release as
      the storage mechanism.
* NodeJS
  * [Meadowlark: **Build and Test**](https://github.com/Ed-Fi-Exchange-OSS/Meadowlark/blob/main/.github/workflows/test.yml)
* Python
  * [Performance Test Suite: **CodeQL Security Scan**](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/blob/main/.github/workflows/codeql.yml)
  * [Performance Test Suite: **Build and Test**](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/blob/main/.github/workflows/edfi_paging_test.yml)

#### Testing

It can be difficult to test Actions without having early merges to the `main`
branch. To work around this, consider forking the repository and merging your
commits into `main`  in the fork only. That will trigger any workflow that runs
off of `main`  itself, and will trigger on pull requests into `main`. Just be
cautious in ensuring that you only push to the fork, not the origin repository!

### Recommended Build / Test Workflow

Generically speaking, a build and test workflow should look something like this:

#### Trigger

* Run on pull request where source code files are modified in the directory that
  is being monitored.
  * If the repository is a monorepo, then it might be appropriate to have
    separate workflows for each application or package.
  * Safe to skip running if only markdown files are modified.
* Run on push to the `main`  branch.
  * It is not necessary to run on every push to every branch.
* Often convenient to also allow push button execution ("workflow dispatch").

#### Job

1. Checkout code
2. Setup tool version if necessary (e.g. specific Python or Nodejs version)
3. Run dependency caching with an appropriate lock file
4. Run code quality ("lint") tests
5. Build code and/ or run static type checks (Python)
6. Run unit tests
7. Run integration tests, if available
8. Report any XML file output back to GitHub (dorny test reporter)

## Policies

### 1. Commit Hashes

Use commit hashes rather than version numbers when specifying an action - even
for those actions created by GitHub itself.

Exception: referencing Ed-Fi's own shared workflows can use the `main` branch
instead of a commit hash or tag.

<details>

<summary>Justification and further details...</summary>

Why? Here is a realistic scenario:

1. We utilize a third-party Action by version number.
2. A malicious user hacks the GitHub account of the maintainer for that
   third-party action.
3. That user tampers with the Action.
   1. Delete the tags
   2. Add a piece of code that determines injects some sort of backdoor into
      commonly-used components (for example, a script that disables certificate
      validation in an application, or that looks for commonly-used identity
      management software and tries to introduce a backdoor administrative
      account)
   3. Re-creates the tag

If a GitHub Actions job uses the _tag_ to access the "correct" Action, then it
will import the maliciously-hacked version. But if it uses the _commit hash_ -
which the malicious user won't be able to manipulate - then either the GitHub
Actions job will import the correct (pre-hacked) code _or_ it will simply fail,
if the hacker removed that commit from the repository.

❌ This initial example has code from
[Understanding GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

Bad: out of the box example:

```yml
name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v
```

⚠️ Better:

* [https://github.com/actions/checkout/releases/tag/v2](https://github.com/actions/checkout/releases/tag/v2)
  get the commit hash → ec3a7ce113134d7a93b817d10a8272cb61118579
* [https://github.com/actions/setup-node/releases/tag/v2](https://github.com/actions/setup-node/releases/tag/v2)
  → 1f8c6b94b26d0feae1e387ca63ccbdc44d27b561

Better example:

```yml
name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@ec3a7ce113134d7a93b817d10a8272cb61118579
      - uses: actions/setup-node@1f8c6b94b26d0feae1e387ca63ccbdc44d27b561
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v
```

✅ Best:

* For the benefit of future readers, retain the version tag as a comment at the
  end of the `uses` line.

Best example:

```yml
name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@ec3a7ce113134d7a93b817d10a8272cb61118579 # v2
      - uses: actions/setup-node@1f8c6b94b26d0feae1e387ca63ccbdc44d27b561 # v2
        with:
          node-version: '14'
      - run: npm install -g bats
      - run: bats -v
```

:::tip

This example is only using actions created by GitHub itself, whom we are fully
trusting. It should be safe to simply use the version tag in these cases.
However, for consistency, we will stick with the commit hashes even for Actions
with the "actions" namespace.

:::

There is one exception to this rule: the action for automated scanning of
allowed actions (described below) cannot use commit hashes, because that
repository itself contains the list of approved hashes. Therefore it will use
the `main` branch.

</details>

### 2. Only Use Approved Actions

A list of approved actions is maintained by the Ed-Fi tech team and made
available to all Ed-Fi developers:
**[approved.json](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Actions/blob/main/action-allowedlist/approved.json)**
(main branch link).

Have a new action that you'd like to use? Ask an Ed-Fi tech team member to
review the source code.

<details>
<summary>Review process...</summary>

Third-party dependencies should not be trusted without verification. This is
true of "regular source code" and of CI scripts alike. In both situations, the
Alliance has historically trusted the open source market place to sniff out and
report on any malicious or buggy dependencies (e.g. NuGet packages, npm, etc.).
Application dependency scanning will be addressed in a separate article.

For all GitHub Actions that are created by third-parties (that is, with a
namespace other than "action"),  and Ed-Fi tech team member should scan through
the source code to look for any obviously malicious or suspicious code:

* Code that modifies our source code
* Requests out to a third-party server
* Use of `GITHUB_TOKEN` for any unexpected reason
* Echo statements that try to guess at repository secrets and print them to the
  log

:::tip

When reviewing a third party JavaScript-based action that is actually written in
TypeScript,  another variant that transpiles down to JavaScript, or has been
"compiled" with WebPack, it can be very difficult to understand the built
`index.js`. Reviewing the **original** source is not sufficient, since someone
malicious could inject code directly into the **distributed** version. When a
source map is provided, one can clone the repository, install
[reverse-sourcemap](https://github.com/davidkevork/reverse-sourcemap), and then
run that utility to recreate the TypeScript. Compare the recreated file with the
original file to ensure that no tampering occurred.

Example:

```bash
git clone https://github.com/zgosalvez/github-actions-ensure-sha-pinned-actions
cd github-actions-ensure-sha-pinned-actions
npm install reverse-sourcemap
npx reverse-sourcemap -o reverse dist/
git diff src/index.js reverse/dist/webpack/github-actions-ensure-sha-pinned-actions/src/index.js
```

:::

</details>

We have created a
[custom Action](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Actions/tree/main/action-allowedlist)
that will scan a repository to compare its use of Actions to the approved list.
If the custom action finds an actions that "use" an unapproved 3rd party action,
it will causes the job to fail. The list of actions can only be modified by the
Ed-Fi tech team and other designated individuals. However, anyone can submit a
pull request asking for a new Action.

### 3. Stick With Ubuntu (when feasible)

Ed-Fi software development has historically focused on Windows usage. The move
to .NET Core (now .NET 5+), the core Ed-Fi software can now be built and run in
Linux, including as Docker containers.

The Ubuntu-based runners provided by GitHub include most of the development
tools that an Ed-Fi developer will need to access: .NET, Python, Nodejs,
PostgreSQL. Windows runners should be avoided whenever possible:

* this helps us continue focusing on cross-platform development
* the Ubuntu runners tend to startup faster and finish builds more quickly
  (anecdotal evidence)
* for private repositories (MetaEd, DataImport), Windows-based runners incur
  double the "charge" against the available 2000 minutes of execution time.

For more information about available runners, please see
[About GitHub-hosted Runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners).

### 4. Do Not Hardcode Sensitive Data

Instead, an Ed-Fi Tech Team member can put the value into an organization or
repository secret.

### 5. Perform Code Analysis

Linters are great for enforcing many style and coding standards (see
[Code Quality Automation](./code-quality-automation)). They may even be able to
detect some security vulnerabilities. However, their algorithms for detecting
vulnerabilities are generally quite limited. An advanced static code scanner can
detect deeper issues.

[CodeQL](https://codeql.github.com/) is our tool of choice for open source
projects,
[covering](https://codeql.github.com/docs/codeql-overview/supported-languages-and-frameworks/)
the following languages used by the Alliance: C#, JavaScript, Python,
TypeScript.

### 6. Scan Dependencies

Supply chain attacks often come in the form of corrupting a dependency, such as
a NuGet or npm package. Dependabot is a helpful GitHub tool for scanning these
dependencies, but it only runs on a schedule in the `main`  branch. Source code
should also be scanned during a pull request.

Open source projects can use the
[Dependency Review Action](https://github.com/actions/dependency-review-action).

### 7. Scan for Trojan Source Attacks

Scan a repo for hidden Unicode bidirectional characters as described in
CVE-2021-42694 and detailed
at [https://trojansource.codes/](https://trojansource.codes/)

The custom
[BiDi Scanner](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Actions/tree/main/bidi-scanner)
action should be used to search for source code that may be trying to invoke
this attack vector.

:::tip

On rare occasions, we allow storage of binary files in source code. Examples
include Visio (.vsdx) and Dacpac (.dacpac) files. These need to be excluded from
the scan, because they legitimately contain the Bi-Directional character. See
the [bidi-scanner README](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Actions/tree/main/bidi-scanner)
for information on how to include a config file for ignoring certain file types.

:::

### 8. Download Artifacts Wisely

Run a build process multiple times is wasteful. When structuring a workflow - or
set of workflows - into multiple jobs, output from one can be shared with the
other as an Artifact. The `dawidd6/actions-download-artifact`  action is a
common tool for downloading those artifacts in the dependent jobs.
Unfortunately, there is risk of a security vulnerability if not done well, which
is
[described by Legit Security](https://www.legitsecurity.com/blog/artifact-poisoning-vulnerability-discovered-in-rust).

In short: if you are not precise about what to download, that action will end up
searching across forks, not just the main repository. A malicious actor can fork
your repository and try to inject malicious artifacts. The solution is to
specify exactly which run_id or commit hash to download.

```yml title="Dangerous Example"
- name:
    Download
    SandboxAdmin,SwaggerUI,WebApi,Databases,EdFi.Ods.Api.Sdk,EdFi.SdkGen
    NugetPackages
  uses: dawidd6/action-download-artifact@1cf11afe3f1874cee82a8d5a2b45c0fd63f0fa22 #v2.19.0
  with:
    workflow: InitDev,Unit tests,Integration tests,Package.yml
    workflow_conclusion: success
    name: NugetPackages.Artifacts
    path: ${{ github.workspace }}/Ed-Fi-ODS-Implementation/NugetPackages/
    check_artifacts: true
    if_no_artifact_found: fail
```

```yml title="Safe Example"
- name:
    Download
    SandboxAdmin,SwaggerUI,WebApi,Databases,EdFi.Ods.Api.Sdk,EdFi.SdkGen
    NugetPackages
  uses: dawidd6/action-download-artifact@1cf11afe3f1874cee82a8d5a2b45c0fd63f0fa22 #v2.19.0
  with:
    workflow: InitDev,Unit tests,Integration tests,Package.yml
    workflow_conclusion: success
    name: NugetPackages.Artifacts
    path: ${{ github.workspace }}/Ed-Fi-ODS-Implementation/NugetPackages/
    commit: ${{ env.INITDEV_COMMIT }} # ✅
    check_artifacts: true
    if_no_artifact_found: fail
```

### 9. Use a CODEOWNERS File

Place a
[CODEOWNERS file](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
in `.github/` allowing only a restricted team to edit the Actions yml files and
core configuration files for automated testing. The restricted team needs to be
selected and configured by Ed-Fi staff. Example:
[Ed-Fi-ODS/.github/CODEOWNERS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/blob/main/.github/CODEOWNERS).

### 10. Fine-Grained Personal Access Tokens

When a GitHub token is needed to perform an action - for example, posting to the
REST API to create a release - the token should be fine-grained, limited to the
specific functionality needed (in this case, "Content" is the correct scope).
Store the token as an organizational Secret; if in the Exchange organization,
restrict its use to the particular repository/ies needed. In the Exchange we
sometimes give non Ed-Fi staff/contractors write access to a repository, and
generally we wouldn't want those repositories to have access to this secret.

Best policy is to create the token with the EdFiBuildAgent account. When
creating the token, you must choose the "Resource Owner" and submit a request
for that token to be approved. The "Resource Owner" in this case means the
organization, as shown in the screenshot below.

![Fine-Grained PATs](https://edfidocs.blob.core.windows.net/$web/img/sdlc/fine-grained-pats.png)

When clicking Save on this form, it will generate a token - copy that and save
it as a secret - and it will generate a _request_ for approval of that token.
The request will show up in the Setting for the organization, and must be
approved before the token can be used
([Exchange settings](https://github.com/organizations/Ed-Fi-Exchange-OSS/settings/personal-access-token-requests)).

The EdFiBuildAgent account also needs to have Write access to the given
repository.
