# Source Code Control Policy

:::note

Describes source code control practices for Ed-Fi software
development.

:::

1. All Ed-Fi source code should be stored in git repositories and synchronized
   between developers using GitHub.
2. The Ed-Fi Alliance has several different GitHub organizations, aligned to
   different purposes. Each new repository must go into an appropriate location.
   (See table at the bottom of the page)
3. All Git commits need to be signed using a private key, and the public key
   must be loaded into GitHub for verification. → see [Signing Git
   Commits](./signing-git-commits.md)
4. See [Code Security
   Guidelines](../continuous-integration/code-security-guidelines/README.md)
   for additional information on securing repositories in GitHub, including
   access permissions, branch protection, and more.
5. Users who do not have write access to a repository can fork the repository
   and then submit pull requests (PR) back to the origin. Pull request reviewers
   should read [checking out pull requests locally](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally) for tips
   on how to manage those PRs. Please be sure when squashing the original
   commits that the committer's name is still associated with the final commit.
6. All contributors need to agree to the [Ed-Fi Contributor's License
   Agreement](./ed-fi-contributors-license-agreement.md) (CLA).

| **Organization**   | **Purpose**                                                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Ed-Fi-Alliance-OSS | All public, fully-supported (“core”) Ed-Fi source code <br/>✅ open for new repositories                                                                                                    |
| Ed-Fi-Exchange-OSS | All public, community-supported or experimental Ed-Fi source code<br/>✅ open for new repositories                                                                                          |
| Ed-Fi-Closed       | Closed source repositories that need GitHub Actions. All contributors must have a paid license<br/>⚠️ new repositories only in coordination with the Ed-Fi Director of Software Engineering |
| Ed-Fi-Alliance     | Legacy account with free private plans, but no GitHub Actions<br/>❌ should not have new repositories here                                                                                  |
