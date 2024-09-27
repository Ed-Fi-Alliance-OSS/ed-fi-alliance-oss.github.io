# Markdown Best Practices

Ed-Fi technical documentation is increasingly moving toward Markdown-flavored
text files stored alongside the source code. While GitHub and some preview
utilities will provide beautiful styling to Markdown, there is value in applying
good pure-text styling for easy readability without the preview. Indeed, that is
the true value of Markdown - the brain can interpret the pure-text styling with
ease, even while reading in a command prompt with no graphical user interface.

## Tool Recommendation

Visual Studio Code is a terrific Markdown editor, though it is not required.
The [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
extension will help identify and solve many stylistic problems and is highly
recommended. Some other potentially useful VS Code extensions:

* [Markdown
    Lint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
* [Markdown All in
    One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
* [Markdown
    Emoji](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-emoji)
* [Markdown Preview Mermaid
    Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
* [Rewrap](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap) -
    the most important and useful extension in this list, as it helps avoid
    hard-to-read long lines.

## Style Guide

Please see [Google's markdown style
guide](https://google.github.io/styleguide/docguide/style.html).

## Diagramming

Many diagrams can be represented in text form with MermaidJs. This is the
preferred format for diagrams. However, there are cases where a more robust tool
might be in order. If you feel that MermaidJs will not suffice, then please use
[https://draw.io](https://draw.io) to create your diagram. Save the `.drawio`
file in the same source code repository so that others can edit it in the
future. Export the diagram or take a screenshot to get a plain image file that
can be saved with the markdown file and referenced through the proper syntax:
`![image caption text](path/to/imag.jpg)`.
