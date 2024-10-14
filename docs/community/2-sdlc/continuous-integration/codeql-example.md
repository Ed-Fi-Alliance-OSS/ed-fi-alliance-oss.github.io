# Example of CodeQL Detecting Dangerous Code

This example comes from the Meadowlark R&D project. In that project, the
development team has been developing a pure prototype application, and the team
(which includes this author) relaxed some standards for the sake of expediency.
However, there is some potential for this code "graduate" up to production
status - in which case, it better not have security vulnerabilities! Here is a
vulnerability that CodeQL discovered during a GitHub Action workflow run:

![CodeQL Vulnerability](/img/sdlc/codeql-0.png)

Clicking on show paths to drill down...

![Text-logging of sensitive information](/img/sdlc/codeql-1.png)

⚠️ ❌ 😲 When there's an error connecting to OpenSearch, the entire set of
connection information gets logged! And this doesn't even have the excuse of
being a debug setting!
