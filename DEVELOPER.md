# Developer's Notes

## Getting Started

New to Markdown? Check out the [Markdown Guide](https://www.markdownguide.org/).

Recommended editor: Visual Studio code, using the extensions defined in
[extensions.json](./.vscode/extensions.json). The markdownlint extension will
help ensure consistent usage of markdown. See
[DavidAnson/markdownlint](https://github.com/DavidAnson/markdownlint) for a full
list of style rules. Minor customization has been applied in
[package.json](./package.json), including allowance for using `<kbd>`, `<br />`,
and a few other HTML tags.

## Formatting Tips

The rewrap extension is incredibly helpful for formatting long lines.
<kbd>ALT+q</kbd> is a handy keyboard shortcut for reformatting. You can select
all text in the file with <kbd>CTRL-a</kbd> and then rewrap with a single
<kbd>ALT+q</kbd> command.

There are three `npm run` commands that can help ensure consistent style:

* `npm run format` will reformat almost everything _except_ `*.md`. This command
  uses Prettier, which does not have provide any customization options for
  Markdown files. Note that it _is_ running on `*.mdx` files.
* `npm run lint` calls Markdownlint, the same tool used in the Visual Studio
  Code extension. It will only report style errors.
* `npm run lint:fix` will automatically fix many style errors, though it cannot
  fix everything.
  * If you have modified a `.mdx` file, then you might want to call `format`
    first and then call `lint:fix`: Prettier will reformat the JSX embedded in
    the `.mdx` file, and Markdownlint will fix the Markdown problems that
    Prettier introduced.

There will be some cases where long lines cannot be reasonably avoided. We might
not ever have it down to zero style errors. But we can at least try to keep it
to a minimum.

## Docusaurus Usage

This website is built using [Docusaurus](https://docusaurus.io/), a modern
static website generator.

### Installation

```powershell
npm install
```

### Local Development

```powershell
npm run start
```

This command starts a local development server and opens up a browser window.
Most changes are reflected live without having to restart the server.

### Build

```powershell
npm run build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service.

> [!TIP] It is a good idea to run the `build` command before pushing a branch to
> GitHub for review. Among other things, it will help you detect broken links.
