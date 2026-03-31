---
name: verify
description: Run full pre-PR validation — lint all files then build the site. Use before submitting a PR to catch style issues and broken internal links.
---

Run the following commands in sequence and report any failures:

1. `npm run lint` — checks all .md and .mdx files for style issues
2. `npm run build` — builds the full Docusaurus site; fails on broken internal links

If either command fails, show the relevant error output and stop. Do not claim success until both pass.
