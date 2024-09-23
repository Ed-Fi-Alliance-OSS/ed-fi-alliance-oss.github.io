# Developer's Notes

## Getting Started

New to Markdown? Check out the [Markdown Guide](https://www.markdownguide.org/).

Recommended editor: Visual Studio code, using the extensions defined in
[extensions.json](./.vscode/extensions.json). The markdownlint extension will
help ensure consistent usage of markdown. See
[DavidAnson/markdownlint](https://github.com/DavidAnson/markdownlint) for a full
list of style rules. Minor customization has been applied in the [VS Code
workspace settings](./.vscode/settings.json), including allowance for using the
`<kbd>` and `<codapi-snippet>` HTML tags.

The rewrap extension is incredibly helpful for formatting long lines.
<kbd>ALT+q</kbd> is a handy keyboard shortcut for reformatting. You can select
all text in the file with <kbd>CTRL-a</kbd> and then rewrap with a single
command.

## Docusaurus Usage

This website is built using [Docusaurus](https://docusaurus.io/), a modern
static website generator.

### Installation

```shell
npm install
```

### Local Development

```shell
npm run start
```

This command starts a local development server and opens up a browser window.
Most changes are reflected live without having to restart the server.

### Build

```shell
npm run build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service.

> [!TIP]
> It is a good idea to run the `build` command before pushing a branch to GitHub
> for review. Among other things, it will help you detect broken links.
