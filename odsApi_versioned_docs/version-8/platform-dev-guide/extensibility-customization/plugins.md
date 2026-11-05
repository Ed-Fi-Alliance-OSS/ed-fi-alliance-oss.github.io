---
sidebar_position: 2
description: How the Ed-Fi API and the Configuration Service load plugins, how to deliver and allowlist a plugin, what to do when one fails to load, and how plugins are built.
---

# Plugins

A plugin adds host-specific code to the Ed-Fi API or the Configuration Service
without changing or rebuilding either one. A plugin is a directory of published
.NET assemblies, built against a contract package. The service loads it at
startup, into an isolated assembly load context, and calls the plugin's hooks so
that it can add configuration and register services.

Plugins are off by default. A plugin runs only when its directory name is listed
in the `Plugins:Allowed` setting of the service that loads it. The Ed-Fi API and
the Configuration Service each have their own plugin directory and their own
allowlist.

In Ed-Fi API v8, plugins provide these features:

| Feature | Loaded by | Contract package | See |
| --- | --- | --- | --- |
| Unique ID validation against an external system | Ed-Fi API | `EdFi.Api.CustomValidation` | [Unique ID System Integration](../../technical-articles/unique-id-system-integration.md) |
| The identity service behind the Identities API | Ed-Fi API | `EdFi.Api.Identity` | [Identities API](../../technical-articles/identities-api.md) |
| Secret references in data store connection strings | Configuration Service | `EdFi.Api.Secrets` | [Secrets in Connection Strings](../configuration/secrets-in-connection-strings.mdx) |
| Replacing the client secret hasher | Configuration Service | `EdFi.Api.Secrets` | [Securing OAuth Client Secrets](../../technical-articles/securing-oauth-secrets.md#replacing-the-hasher) |
| Service settings, such as keys and client secrets, from a secret store | Either service | `EdFi.Api.Plugins` only | [Secrets in Connection Strings](../configuration/secrets-in-connection-strings.mdx) |

Every plugin references `EdFi.Api.Plugins`, which provides the base class that
all plugins derive from.

The first half of this page is for the platform hosts who install and run
plugins. The second half, [Building a Plugin](#building-a-plugin), summarizes
what a plugin developer must do.

:::warning

A loaded plugin runs with the full trust of the service that loads it. Install
only plugins from sources you trust. See [Trust](#trust).

:::

## Loading a Plugin

### The Plugin Directory and the Allowlist

Both services read the same two settings:

| Setting | Default | Description |
| --- | --- | --- |
| `Plugins:Directory` | `/app/plugins` | The plugin root. Each plugin is a subdirectory of it. A relative path is resolved against the application's base directory. |
| `Plugins:Allowed` | _(empty)_ | A comma-separated, ordered list of plugin directory names to load. |

With Docker, set them as `Plugins__Directory` and `Plugins__Allowed`. See
[Configuration Details](../configuration/configuration-details.mdx) for both
services' settings.

`Plugins:Allowed` is the only switch. A plugin runs if and only if its directory
name is in the list:

- **Nothing loads while the list is empty.** The service doesn't even look at the
  plugin root, so a missing root isn't an error.
- **A directory under the plugin root that isn't on the list is never opened.**
  When the list names at least one plugin, the service logs one warning that
  names every directory it ignored.
- **The list is ordered.** Plugins are called in the order they're listed. When
  two plugins supply the same configuration setting, the later one wins.
- **Each entry is trimmed, and empty entries are dropped.** What's left must be a
  single directory name: ASCII letters and digits, `.`, `_` and `-`, starting
  with a letter or digit.
- **A name that appears twice fails startup,** including two names that differ
  only in case. On a case-insensitive filesystem they would be one directory, and
  on the Linux container image they're two, so the list is ambiguous.

Every other comparison of plugin names is case-sensitive, on every filesystem.
The released images run on Linux, where `Acme.Identity` and `acme.identity` are
different directories. The service reads the directory name back from the
filesystem and compares it exactly, so a mis-cased name fails startup on Windows
and macOS too, not just in the container.

### The Ed-Fi API and the Configuration Service Load Plugins Separately

Each service loads plugins from its own plugin root, using its own
`Plugins:Allowed`. Allowlisting a plugin for the Ed-Fi API doesn't load it in
the Configuration Service, and the reverse. A plugin that both services use must
be delivered to each and listed in each.

A plugin that registers a contract only one service defines fails startup in the
other. For example, a plugin that registers a secret resolver can only be
allowlisted in the Configuration Service. Only a plugin that adds configuration
and registers no contract can be loaded by both services.

### Settings Supplied by Plugins

A plugin can add a configuration source, such as a secret store, so that some
settings come from it instead of from configuration files or environment
variables. Plugin sources rank as follows:

- Unprefixed environment variables and command-line arguments override every
  plugin source. To take a setting from a plugin, remove it from the environment.
- Plugin sources override `appsettings.json` and the environment variables
  prefixed with `ASPNETCORE_` or `DOTNET_`.
- Among plugins, a plugin later in `Plugins:Allowed` overrides an earlier one.

A plugin can't supply the `Plugins` settings, because they're read before any
plugin loads. See [Secrets in Connection
Strings](../configuration/secrets-in-connection-strings.mdx) for the settings a
secrets plugin is typically used for.

## Getting a Plugin into a Container

The Ed-Fi API doesn't download plugins. Placing a plugin directory under the
plugin root is a deployment step that happens before the service starts. The
Docker Compose files in the Ed-Fi API repository provide two ways to do it, as
overlays that you add to the stack. The two are alternatives: both use the
`/app/plugins` mount, so choose one for each service.

Getting the files into place doesn't turn a plugin on. Neither overlay sets
`Plugins:Allowed`; you add the plugin to the allowlist in a separate step.

### Option 1: Mount a Directory You Prepare

Publish the plugin directories into a folder on the host. The `plugins-dms.yml`
overlay mounts that folder read-only at `/app/plugins` in the Ed-Fi API
container. Its one required variable, `DMS_PLUGINS_MOUNT_SOURCE`, is the host
path.

Nothing in this overlay writes to the folder; replacing a plugin's files is
your own step. Stop the stack before you replace them, for the same reason given
under option 2.

### Option 2: Fetch a Pinned Package

The `plugins-fetch-dms.compose.yml` overlay adds a one-time `fetch-plugins`
service that runs before the Ed-Fi API starts. It downloads the plugin's
`.nupkg`, checks it against a SHA-256 digest you pin, clears the plugin's
directory, extracts the plugin into a volume, and exits. The Ed-Fi API then
mounts that volume read-only. It needs three variables:

| Variable | Description |
| --- | --- |
| `PLUGIN_PACKAGE_URL` | The package's download address, in the feed's `PackageBaseAddress` form: `<base>/<id>/<version>/<id>.<version>.nupkg`, in lowercase. |
| `PLUGIN_PACKAGE_SHA256` | The SHA-256 of the `.nupkg` file. The fetch stops before extracting anything if it doesn't match. |
| `PLUGIN_NAME` | The plugin's directory name. The fetch extracts only `contentFiles/any/any/<PLUGIN_NAME>/` from the package. The name follows the same rule as an allowlist entry. |

Compute the digest of a package you've approved with, for example,
`shasum -a 256 acme.identity.1.2.0.nupkg`. The digest is how you approve the
exact bytes that are installed, so take it from the package you reviewed, not
from the feed.

To update a plugin, stop the stack before fetching again. The fetch clears the
plugin directory, and a running service that loads an assembly after that can
find files missing or mismatched:

```powershell
./bootstrap-local-dms.ps1 -d
./bootstrap-local-dms.ps1
```

Don't add `-v` for a plugin update. It also deletes the database volumes.

### Adding the Plugin to the Allowlist

Put the allowlist in a small override file of your own, and list it after the
overlay. For the local stack started by `bootstrap-local-dms.ps1`, name both
files in `DMS_PLUGINS_COMPOSE_FILES` in the environment file the script reads
(`.env` by default). The variable is read from that file only, not from the
shell environment.

```yaml
# my-plugins-allowed-dms.yml
services:
  dms:
    environment:
      Plugins__Allowed: Acme.Identity
```

```text
DMS_PLUGINS_COMPOSE_FILES=plugins-dms.yml;my-plugins-allowed-dms.yml
DMS_PLUGINS_MOUNT_SOURCE=C:/plugins
```

For option 2, name `plugins-fetch-dms.compose.yml` instead, and set the three
package variables in place of `DMS_PLUGINS_MOUNT_SOURCE`. Then start the stack
with `./bootstrap-local-dms.ps1`, as described in [Docker
Deployment](../../getting-started/docker-deployment.md).

### Plugins for the Configuration Service

The `plugins-config.yml` overlay mounts a host folder, named by
`CONFIGURATION_SERVICE_PLUGINS_MOUNT_SOURCE`, read-only at `/app/plugins` in the
Configuration Service container. There's no fetch overlay for the Configuration
Service, and `start-local-config.ps1` doesn't add plugin overlays. Add
`plugins-config.yml` and an allowlist override for the `config` service with
their own `-f` options, after the Configuration Service's base Compose file.

For the exact commands, and for running the fetch as a Kubernetes init
container, see the Plugins sections of the [operations
guide](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/docs/OPERATIONS.md#plugins)
and the [Docker Compose
README](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/eng/docker-compose/README.md#loading-plugins)
in the Ed-Fi API repository.

## Trust

A loaded plugin runs with the full trust of the service that loads it. It can
read every connection string, decrypted secret, request body and token. The
isolated load context keeps a plugin's assemblies apart from the service's; it
isn't a security boundary, and nothing limits what a plugin does once it loads.
The controls you have are about what gets loaded:

- **The service account must never be able to write to the plugin root.** Write
  access to the plugin root is the same as being able to run code as the
  service. The read-only mounts in both options enforce this for containers. The
  Ed-Fi API can't check it for you.
- **Pin a digest for every plugin you install.** A digest proves the files didn't
  change after you approved them. It doesn't prove what they do, so install only
  plugins from sources you trust.
- **The allowlist decides what runs.** No plugin can change it.

A plugin whose hook hangs stops the service from starting. Before calling each
hook, the service writes the plugin's name to standard error, so the last line
written names the plugin.

## When a Plugin Doesn't Load

If an allowlisted plugin doesn't load, the service doesn't start. That's
deliberate: a plugin that silently failed to load could, for example, stop
unique IDs from being checked while writes kept succeeding.

### Where to Look

Plugins load before logging is set up, so the loader writes to standard error.

- **Why the Ed-Fi API didn't start:** the startup status file, at
  `AppSettings:StartupStatusFilePath` (by default `dms-startup-status.json` in the
  system temporary directory). It records the startup phase, the exception type
  and the message. Plugin failures appear in the `LoadPlugins`,
  `ConfigureServices` or `ValidatePluginRegistrations` phase.
- **Why the Configuration Service didn't start:** standard error. It has no
  startup status file.
- **What loaded:** one `Plugin inventory` log event for each loaded plugin. It
  lists the plugin's version, its files, the services it registered and the
  registrations it removed. Keep these events: they're the record of which
  third-party code a service was running.

Two conditions are warnings, not failures, and they're also replayed to the
application log as `Plugin loader warning` events:

- `UnallowlistedDirectories`: directories under the plugin root that the
  allowlist doesn't name.
- `PluginRootNotListed`: the service couldn't list the plugin root. If you see
  this, the absence of the first warning doesn't mean there were no other
  directories.

### What to Do About a Failure

The error message names the problem, and the plugin where there is one. Most failures fall into one
of these groups:

| Who fixes it | Examples |
| --- | --- |
| You, in the allowlist | A name that's repeated, that isn't a single directory name, or whose directory or main assembly is missing. Check the spelling and case first. |
| You, in the deployment | The plugin root is missing while plugins are allowlisted, or the plugin's main assembly can't be loaded. |
| The plugin developer | The plugin needs a newer contract version than the service has, was published incorrectly, has mismatched names, or registers something it isn't allowed to. You can also run a service version the plugin supports. |
| You, by choosing one plugin | Two plugins register the same single-implementation contract, such as two secret resolvers. Remove one from the allowlist. |

While you wait for a fix, remove the plugin's name from `Plugins:Allowed` to
start the service without it. For the full list of failures, see [When a plugin does not
load](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/docs/OPERATIONS.md#when-a-plugin-does-not-load-dms-does-not-start)
in the operations guide.

## Compatibility

When a plugin and a service share an assembly, the plugin gets the service's
copy. So a plugin must be compatible with the assemblies the service carries,
not only with the contract packages.

- **Each Ed-Fi API release publishes a host assembly manifest** with its release
  assets. It lists the contract versions and every other assembly that release
  carries. Check a plugin against the manifest of the release you'll run it on.
- **The Configuration Service has no manifest.** The contract versions it carries
  are the ones in its source at the release tag.
- **Newer services support older contract versions.** The contracts only ever
  add members, so a plugin built against an older contract version still runs
  against them. That guarantee covers only the contracts: check the plugin's
  other shared dependencies against the target release's manifest.
- **A newer plugin doesn't run on an older service.** A plugin built against a
  newer contract, or a newer version of an assembly the service also carries, is
  refused with a message naming both versions. Usually that happens at startup.
  An assembly the plugin reaches only through a framework reference is checked
  when it's first used instead, so if that's during a request, the failure shows
  up as repeated `500` responses rather than a failed startup.

## Building a Plugin

This section summarizes the rules for plugin developers. The [plugin developer's
guide](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/src/plugins/EdFi.Api.Plugins/PLUGINS.md)
in the Ed-Fi API repository has the details.

### Contract Packages

The contract packages are published to the Ed-Fi Azure Artifacts feed:

```text
https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json
```

| Package | Use in v8.1 | Details |
| --- | --- | --- |
| `EdFi.Api.Plugins` | The `EdFiApiPlugin` base class. Every plugin references it. | This page |
| `EdFi.Api.CustomValidation` | Unique ID validation | [Unique ID System Integration](../../technical-articles/unique-id-system-integration.md) |
| `EdFi.Api.Identity` | The Identities API | [Identities API](../../technical-articles/identities-api.md) |
| `EdFi.Api.Secrets` | Configuration Service secrets and the client secret hasher | [Secrets in Connection Strings](../configuration/secrets-in-connection-strings.mdx) |

Each package has its own version, independent of the Ed-Fi API release. See
[Package Releases](../../getting-started/package-releases.md) for the current
versions. Pin the version exactly, in brackets, so that a build doesn't pick up
a newer contract than the service you target carries:

```xml
<PackageReference Include="EdFi.Api.Plugins" Version="[1.1.0]" />
```

### The Plugin Class

A plugin's main assembly contains exactly one public, non-abstract, non-generic
class that derives from `EdFiApiPlugin` and has a public parameterless
constructor. The class has three members:

- `Name` returns the plugin's directory name.
- `ContributeConfiguration` can add configuration sources, such as a secret
  store. It can only add sources; removing or reordering an existing source fails
  startup.
- `ContributeServices` registers the plugin's services.

Both hooks do nothing by default, so a plugin overrides only what it needs. The
service calls `ContributeConfiguration` on every plugin, in allowlist order, and
then `ContributeServices` on every plugin, in the same order.

A plugin must register at least one contract the service calls, or add at least
one configuration source. A plugin that does neither fails startup, because it
contributes nothing the service will use. That usually means it was allowlisted
in the wrong service.

### Naming Rules

Four names must match exactly, including case:

1. The plugin's directory name.
1. The main assembly's file name, `<Name>.dll`.
1. The assembly's own name.
1. The value `Name` returns.

Set `AssemblyName` in the project file so that the assembly name matches. Don't
name any assembly you write `EdFi.DataManagementService.*` or
`EdFi.DmsConfigurationService.*`. The service treats assemblies with those names
as its own and refuses a plugin's types in them.

### Registration Rules

A plugin may register its own types, `Microsoft.Extensions.*` types, logging
providers, and the contracts the service defines. It may not:

- register any other service type the host owns, or remove or replace a
  pre-existing registration for a host-owned service type;
- remove or replace the host's logging, including by calling
  `logging.ClearProviders()`, or add its own logger factory;
- register a contract under a wildcard service key.

Each contract is either _fan-in_, where every registered implementation runs, or
_replace_, where one implementation takes the place of the service's default:

| Contract | Service | Kind | Register with |
| --- | --- | --- | --- |
| `ICustomResourceValidator` | Ed-Fi API | Fan-in | `TryAddEnumerable` |
| `IIdentityService` | Ed-Fi API | Replace | `Add` |
| `ISecretResolver` | Configuration Service | Replace | `Add` |
| `IClientSecretHasher` | Configuration Service | Replace | `Add` |

Use the form in the table. `TryAddEnumerable` adds to the implementations other
plugins registered instead of replacing them. A replace contract must use a
plain `Add`, never a `TryAdd` form: if a `TryAdd` declines, the replacement
silently never happens, and the service can't always detect it. With `Add`, two
plugins that both replace one contract fail startup with a message naming both.

### Publishing and Packaging

- **Publish framework-dependent**, into a directory named for the plugin, for
  example `dotnet publish --no-self-contained -o out/Acme.Identity`. A
  self-contained publish fails startup.
- **Keep the `.deps.json` file.** A plugin without one fails startup.
- **Ship the whole publish output.** Don't remove files because the service also
  carries them; the service decides which copy to use when it loads them.
- **Package the directory as an asset-only `.nupkg`,** with the published
  directory under `contentFiles/any/any/<Name>/` and no `lib/` or `ref/`
  entries. This is the layout option 2 extracts.
- **Publish the package's SHA-256** beside it, so that hosts can pin it.
