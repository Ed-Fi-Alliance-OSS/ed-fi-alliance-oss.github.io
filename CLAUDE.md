# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Repo

Docusaurus 3 documentation site for Ed-Fi Alliance, published to <https://docs.ed-fi.org>. Content lives in `docs/` (four sections: getting-started, partners, reference, community), `blog/`, and `drafts/` (not built/published).

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

## MDX React Components

Use `.mdx` (not `.md`) when a page needs React components. Always add the import at the top of the file.

**`Tabs` / `TabItem`** — use when content differs by environment, OS, tool version, or configuration variant (e.g., PostgreSQL vs SQL Server, desktop vs web app).

```jsx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="pg" label="PostgreSQL" default>...</TabItem>
  <TabItem value="mssql" label="SQL Server">...</TabItem>
</Tabs>
```

**`ThemedImage`** — use when an image needs separate light-mode and dark-mode variants (e.g., logos with black/white alternates).

```jsx
import ThemedImage from '@theme/ThemedImage';

<ThemedImage
  alt="Description"
  sources={{
    light: 'https://edfidocs.blob.core.windows.net/$web/img/logo_black.png',
    dark:  'https://edfidocs.blob.core.windows.net/$web/img/logo_white.png',
  }}
/>
```

**`DocCardList`** — use on section index/overview pages to auto-render cards for all child docs. No props needed.

```jsx
import DocCardList from '@theme/DocCardList';

<DocCardList />
```

**`Link`** — use for button-style calls-to-action (not plain hyperlinks).

```jsx
import Link from '@docusaurus/Link';

<Link to="https://example.com" className="button button--primary">Open</Link>
```

**Custom components** — `OdsApiDropDown`, `CertificationTable`, `BadgingTable` are one-off components in `src/components/` and `docs/partners/`. Only use them on the specific pages that already use them.

## Branch and PR Conventions

- Branch names: `TRACKER-ID` (e.g., `DOC-269`)
- PR titles: `[TRACKER-ID] Brief description`
- All PRs require a Jira ticket and code review

## Gotchas

- **Windows long paths**: requires `git config --global core.longpaths true` and registry edit — see DEVELOPER.md
- **Broken internal links**: build fails (`onBrokenLinks: 'throw'`) — validate with `npm run build` before PR
- **Images**: most are in Azure blob storage; open-source contributors include images in PR, core devs upload to Azure and update URLs
- **`drafts/`**: not built or published; work-in-progress content only
