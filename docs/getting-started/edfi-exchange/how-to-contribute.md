# How to Contribute

## How to contribute

If your organization has developed Ed-Fi aligned technologies or informational resources as part of an Ed-Fi technology implementation, please start by [creating a ticket](https://tracker.ed-fi.org/secure/CreateIssue!default.jspa) in the [Ed-Fi Tracker  project](https://tracker.ed-fi.org/projects/EDFI) (using the "Exchange Contribution" issue type) , and provide the following information in the ticket:

* Project Name:
* Brief Description:
* Contact name/email:
* Ed-Fi version supports (if applicable):
* License terms:
* Ed-Fi-hosted repo needed?
* A member of the Ed-Fi technical team will follow up with you via the ticket.

## Tips for a Smooth Contribution Process

1. Carefully review your code for security and privacy:

   * Ensure there are no private keys and secrets, access tokens, or passwords

   * Make sure there are no live student data
   * If there are realistic-looking, yet fake, student data, it might be worth stating that clearly in the project Readme to head off concerns that real data might have leaked out.

2. Read [Signing Git Commits](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20875476/Signing+Git+Commits) - the Git commits needs to be signed in order to prove identity.

3. Provide a useful README file describing the functionality.
4. Provide installation instructions. These do not need to be absolutely foolproof; they need only be good enough to set someone in the right direction.
Example: [Readme](https://github.com/Ed-Fi-Exchange-OSS/SDCOE-Data-Hub/blob/main/README.md) and [Deployment](https://github.com/Ed-Fi-Exchange-OSS/SDCOE-Data-Hub/blob/main/Docs/README.md) instructions from the SDCOE Data Hub

## Creating a New Exchange Repository on GitHub

These notes are primarily for the internal audience of users who can create new repositories for community contributions. The community may find them helpful in thinking about creating their own repositories as well.

1. Preferably create the repository from the "Template-For-GitHub" repository (this is an option on the "Create Repository" page). (warning) This only applies to authorized users when they are creating a repository inside the Ed-Fi-Exchange-OSS organization on GitHub.

![New Exchange Repository on Github](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/new-exchange-repo.png)

2. Once created, update the README, NOTICES, and CONTRIBUTORS files. Just read the text and the required updates should hopefully be clear.

3. Go to the Settings page: disable Wikis. If the project will be supported by the Ed-Fi / MSDF team, best to disable Issues so that people are forced to post in Tracker rather than in GitHub. But third parties might like to have the Issues.

4. In settings, click on Branches, then setup branch protection rules. Branch name pattern: main. Enable: require a pull request before merging; require status checks to pass before merging; require signed commits; require linear history.  If someone else really doesn't want these features, we can turn off - except "Require signed commits".
5. Give WRITE access to the contributor.
