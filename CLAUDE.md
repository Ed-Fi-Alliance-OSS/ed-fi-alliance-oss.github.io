# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Repo

Docusaurus 3 documentation site for Ed-Fi Alliance, published to https://docs.ed-fi.org. Content lives in `docs/` (four sections: getting-started, partners, reference, community), `blog/`, and `drafts/` (not built/published).

## Key Commands

| Purpose | Command |
|---------|---------|
| Dev server | `npm run start` |
| Build | `npm run build` |
| Lint all | `npm run lint` |
| Lint + auto-fix | `npm run lint:fix` |
| Lint one folder | `npm run lint:folder <path>` |
| Format (.mdx only) | `npm run format` |
| Generate heading IDs | `npm run write-heading-ids` |

## Linting Rules

- `.md` files: linted with markdownlint, **not** Prettier (Prettier intentionally excludes `*.md`)
- `.mdx` files: run `npm run format` **first**, then `npm run lint:fix` — order matters

## Markdown Conventions

- Emphasis: underscores (`_text_`), not asterisks
- Bullets: dashes (`-`)
- Code blocks: fenced with language identifier
- Admonitions: Docusaurus syntax (`:::note`, `:::tip`, `:::info`, `:::warning`, `:::danger`)
- Allowed inline HTML: `<kbd>`, `<br>`, `<details>`, `<summary>`, `<sup>`, `<iframe>`, `<codapi-snippet>`
- File names: lowercase, hyphen-separated (e.g., `migration-utility.md`)

## Branch and PR Conventions

- Branch names: `TRACKER-ID` (e.g., `DOC-269`)
- PR titles: `[TRACKER-ID] Brief description`
- All PRs require a Jira ticket and code review

## Gotchas

- **Windows long paths**: requires `git config --global core.longpaths true` and registry edit — see DEVELOPER.md
- **Broken internal links**: build fails (`onBrokenLinks: 'throw'`) — validate with `npm run build` before PR
- **Images**: most are in Azure blob storage; open-source contributors include images in PR, core devs upload to Azure and update URLs
- **`drafts/`**: not built or published; work-in-progress content only
