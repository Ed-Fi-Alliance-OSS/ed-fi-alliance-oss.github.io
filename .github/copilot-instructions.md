# Copilot Instructions for ed-fi-alliance-oss.github.io Documentation

This repository contains documentation for Ed-Fi Alliance projects. Please follow these guidelines when using AI code assistants (such as GitHub Copilot) to generate or edit markdown files.

## General Guidelines

- **Preserve Structure:**
  Maintain the existing folder and file structure. Place new documentation in the most relevant subdirectory.

- **Markdown Conventions:**

  - Use standard Markdown syntax for headings, lists, tables, and code blocks.
  - Prefer semantic headings (`#`, `##`, `###`, etc.) for section organization.
  - Use fenced code blocks with language identifiers for code samples.
  - Use Docusaurus-style admonitions for notes, warnings, and tips. Examples:

    ```markdown
    :::note
    This is a note.
    :::

    :::tip
    This is a tip.
    :::

    :::info
    This is informational.
    :::

    :::warning
    This is a warning.
    :::

    :::danger
    This is a danger / error alert.
    :::
    ```

  - Use tables for scenario or feature matrices.
  - Use a dash (`-`) for bullet points and numbers for ordered lists.

- **Content Style:**
  - Write in clear, concise, and neutral language.
  - Avoid unnecessary repetition.
  - Use line comments `...existing code...` to indicate unchanged content when suggesting edits.
  - When converting from HTML or other formats, remove all inline styles and extraneous tags.

- **File Naming:**
  - Use lowercase, hyphen-separated filenames (e.g., `migration-utility.md`).
  - Place new files in the most appropriate subdirectory under `docs/`.

- **Front Matter:**
  - If a file requires metadata, use YAML front matter at the top.

## Editing Instructions

- When suggesting changes, group edits by file and start each code block with a comment containing the filepath.
- For unchanged regions, use `...existing code...` as a placeholder.
- For new files, include a summary of the file's purpose at the top as a comment.

## Example

```markdown
// filepath: d:\documentation\ed-fi-alliance-oss.github.io\docs\example.md
# Example Title

...existing code...

## New Section

This is a new section added to the documentation.

...existing code...
```

## Additional Notes

- Ensure all links are valid and use HTTPS where possible.
- Prefer relative links for internal documentation references.

---
_Last updated: 2025-06-30_
