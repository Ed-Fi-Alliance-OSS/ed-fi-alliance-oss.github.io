# Developer's Notes

## Getting Started

New to Markdown? Check out the [Markdown Guide](https://www.markdownguide.org/).

Recommended editor: Visual Studio code, using the extensions defined in [extensions.json](./.vscode/extensions.json). The markdownlint extension will help ensure consistent usage of markdown. See [DavidAnson/markdownlint](https://github.com/DavidAnson/markdownlint) for a full list of style rules. Minor customization has been applied in [package.json](./package.json), including allowance for using `<kbd>`, `<br />`, and a few other HTML tags.

### Windows Long File Path Support

Some files in this repository have names long enough to potentially cause problems for Windows users, especially in the generated build directories. To avoid path length issues when cloning or building this repository on Windows, you may need to enable long file path support:

1. Press Win + R, type `regedit`, and press Enter.
2. Navigate to: `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`
3. Find or create a DWORD (32-bit) Value named: `LongPathsEnabled`
4. Set its value to `1`.
5. Restart your computer.

Additionally, configure Git to handle long paths:

```powershell
git config --global core.longpaths true
```

## Formatting Tips

There are three `npm run` commands that can help ensure consistent style:

* `npm run format` will reformat almost everything _except_ `*.md`. This command uses Prettier, which does not have provide any customization options for Markdown files. Note that it _is_ running on `*.mdx` files.
* `npm run lint` calls Markdownlint, the same tool used in the Visual Studio Code extension. It will only report style errors.
* `npm run lint:folder <folder-path>` calls Markdownlint, the same tool used in the Visual Studio Code extension. It will only report style errors in the specified folder. eg: `npm run lint:folder docs/reference/3-admin-api`
* `npm run lint:fix` will automatically fix many style errors, though it cannot fix everything.
  * If you have modified a `.mdx` file, then you might want to call `format` first and then call `lint:fix`: Prettier will reformat the JSX embedded in the `.mdx` file, and Markdownlint will fix the Markdown problems that Prettier introduced.

There will be some cases where long lines cannot be reasonably avoided. We might not ever have it down to zero style errors. But we can at least try to keep it to a minimum.

## Images

We are putting most images into Azure blob storage instead of directly in this repository. If you are an open source contributor and have an image to include, please include it in your initial pull request. A core developer can then upload the image(s) into Azure for you and reply with the new URL(s). You'll then delete the image(s) from your pull request and update the image links to point to the Azure URL.

## Docusaurus Usage

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```powershell
npm install
```

### Local Development

```powershell
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```powershell
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

> [!TIP]
> It is a good idea to run the `build` command before pushing a branch to GitHub for review. Among other things, it will help you detect broken links.
