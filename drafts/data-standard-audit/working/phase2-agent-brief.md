# Phase 2 Agent Brief (shared by all Phase 2 agents)

You are one of about 18 parallel agents auditing the Ed-Fi Data Standard
documentation. Repo root: `/home/user/ed-fi-alliance-oss.github.io`. All paths
below are relative to it.

## Read before starting

- `drafts/data-standard-audit/plan.md`: the Phase 2 section, and the "Context
  From Initial Reconnaissance" section.
- `drafts/data-standard-audit/rubric.md`: the scoring criteria and the
  **Findings Schema**. Cite rubric codes (for example, `H1` or `T3`).
- `drafts/data-standard-audit/terminology-guidelines.md`: your own
  recommendations and proposed rewrites must follow it.

## Inputs available

- `drafts/data-standard-audit/working/inventory-html.csv`: one row per
  in-scope page. Columns include `set`, `rel_path`, `repo_path`, `url`,
  `domain`, `page_type`, `words`, `h1`, `html_title`, `meta_description`,
  `canonical`, `visible_words`, and `mermaid_containers`.
- `build/`: the built site, which is what Perplexity crawls. A published URL
  path `/x/y` is at `build/x/y/index.html`.
- `drafts/data-standard-audit/working/version-diff.csv`,
  `table-dupes.csv`, `terminology-hits.csv`, and `retrieval-results.csv`.
- `drafts/data-standard-audit/questions.yaml`: synthetic new-learner
  questions.
- `drafts/data-standard-audit/scripts/retrieval.py "query"`: an ad hoc BM25
  search over the whole built site. It is directional only.

## Rules

1. **Read-only** on `docs/`, `dataStandard_versioned_docs/`, `build/`, and
   every existing file. Write **only** your own output file or files named in
   your task. Use your own scratch files under `/tmp/claude-0/` if needed.
2. **Evidence is required** for every finding: a short quote, or a metric with
   its source. Findings without evidence will be discarded.
3. **Known site-wide issues — record once, not per page.** These are already
   established:
   - No `description` front matter on any page.
   - No Data Standard version in `<title>` or H1.
   - Mermaid diagrams are invisible in the built HTML.
   - Self-referencing canonicals on every version.
   - Duplicated descriptor and extended-reference rows across domains.

   Record each of these at most once, as `pattern: site-wide`, and only if you
   have something new to add, such as a domain-specific consequence or a
   concrete rewrite example. Spend your effort on what is _specific_ to your
   scope.
4. Use `pattern` carefully. If the same issue appears on most domains in your
   batch, mark it `domain-template` and list the affected pages in the
   evidence cell, rather than writing one row per page.
5. Write findings as a Markdown table using the exact Findings Schema columns.
   Escape any `|` inside cells as `\|`. Give `id` values the prefix of your
   agent ID (for example, `2b3-07`).
6. Your output file starts with a short header: Scope, Method, Summary (5–10
   bullets with the most important points). After that come the findings
   table and any task-specific sections.
7. Follow repository Markdown conventions: dashes for bullets, underscores
   for emphasis.
8. **Final message to the orchestrator**: 150 words or fewer. Include counts by
   severity (H/M/L), the 3 most important findings, and anything that blocked
   you. Do not paste the file.
