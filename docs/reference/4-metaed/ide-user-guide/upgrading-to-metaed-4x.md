# MetaEd IDE - Upgrading to MetaEd 4.x

## Installation Process

MetaEd 4.x relies on Visual Studio Code instead of Atom as the text editor. With
this change, we have a substantial simplification of the installation process:

1. Download and install [Visual Studio Code](https://code.visualstudio.com/)
2. Install the MetaEd extension from the Visual Studio Marketplace
    1. Video from Microsoft: [Install Visual Studio Code
        extensions](https://code.visualstudio.com/learn/get-started/extensions)
    2. Written instructions: [Extension
        Marketplace](https://code.visualstudio.com/docs/editor/extension-marketplace)

## Cleanup of Old MetaEd IDE

:::caution

These steps are optional. If there is any chance that you will want to open Atom
and temporarily use an older version of MetaEd, then you should not follow these
instructions.

:::

1. Uninstall Atom
2. Uninstall NodeJs, if you only have it for MetaEd
3. If you were on an older version of MetaEd (pre 2022), then you might have a
    direct installation of the Yarn package manager, which can now be removed.

## Behavior Changes

As an end-user, you should be aware of the following:

* Future updates to MetaEd will be in the form of extension updates in the
    marketplace. For most people, extensions update automatically.

    <details>
    <summary>Disabling automatic updates...</summary>

    As a general rule, we recommend accepting the automatic updates. However,
    you do have some control over this auto update functionality. Open the User
    preferences and search for "extension auto update" to see the options
    available to you.

    ![Automatic updates](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/automatic-updates.png)

    </details>

* As of the 4.0 release, the IDE no longer has support to right-click in the
    file explorer and create a new MetaEd item from a language-specific
    template.

### Extension developers

See [MetaEd IDE - Creating and Maintaining Your
Extension](./creating-and-maintaining-your-extension.md)
for more information on the new settings and how to open your extension folder.

### Core Ed-Fi Data Standard developers

Manually set the "Data Standard Project Directory" to your local clone of the
Git repository, and be sure to check the "Alliance Mode" box.

![Data standard project directory](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/alliance-mode.png)
