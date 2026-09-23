# Advisory: Assessment of the Polly Open Source Maintenance Fee

9 September 2026

The Polly project has announced that it will adopt the Open Source Maintenance
Fee (OSMF) on 16 November 2026. Polly is a .NET resilience library used by
multiple Ed-Fi applications. This advisory assesses what the change means for
the Ed-Fi Technology Suite and for the organizations that deploy it.

**Summary: no action is required for users of currently released components of
the Ed-Fi Technology Suite.**

## Background

On 14 July 2026 the Polly project
[announced](https://thepollyproject.org/2026/07/14/polly-osmf-announcement.html)
its adoption of the [Open Source Maintenance
Fee](https://opensourcemaintenancefee.org/). The key terms:

- Effective 16 November 2026.
- Organizations earning at least US $20,000 from a product or project that uses
  Polly are asked to pay US $20 per month per organization, not per product.
- Individuals, hobbyists, students, and nonprofits not generating revenue from
  Polly are excluded.
- **Polly's license is not changing.** The source code remains under
  BSD-3-Clause. The fee is implemented as a separate end-user agreement attached
  to binary releases published after adoption.

## Assessment for current releases

No impact.

The reason is straightforward: the Polly maintainers have confirmed that the fee
is **not applied retroactively**. In the project's [OSMF
discussion](https://github.com/App-vNext/Polly/discussions/3183#discussioncomment-18064382),
a maintainer stated that "licenses in a version are immutable" and that "this
isn't being applied retroactively." On 16 November 2026, new terms take effect
and a _new_ version may be published; packages already on NuGet remain under
BSD-3-Clause permanently.

This applies to every currently released Ed-Fi product, including the Ed-Fi
ODS/API, the Ed-Fi API v8, and the Ed-Fi API Publisher. The most recent Polly
release is 8.7.0, published on 10 June 2026 under BSD-3-Clause. No Polly
package carrying the new terms exists yet, and none will be published before
16 November 2026. Every Ed-Fi release therefore references a Polly version
that predates OSMF adoption.

Individual Ed-Fi products and release lines reference a range of Polly package
versions, and several reference more than one Polly package. All of them predate
adoption, so deployments running any currently released Ed-Fi version are not
affected by the fee, regardless of how long they continue to run it.

## Will my build break on 16 November?

No. Nothing about the build process changes for existing Ed-Fi releases on that
date.

Because Polly's license is not changing, there is no NuGet vulnerability warning
to trigger a "warning as error" build failure, and no license acceptance prompt
during `dotnet restore`. Builds that reference the Polly versions used by
current Ed-Fi releases will continue to restore exactly the same packages,
before and after 16 November.

This applies to builds and deployments based on any currently released Ed-Fi
version, whether they consume Ed-Fi binaries or rebuild Ed-Fi from source with
custom extensions.

## What about automated dependency updates?

This is the one scenario worth a second look. Automated tools such as Dependabot
or Renovate can propose upgrades to a post-adoption Polly package without anyone
explicitly evaluating the licensing implications. Once a release carrying the
new end-user agreement is published, a routine dependency update may introduce
it into the normal review process.

In the [OSMF discussion](https://github.com/App-vNext/Polly/discussions/3183),
community members asked the maintainers to publish post-adoption releases under
a new NuGet package ID so that automated updates could not cross that boundary
silently. As of this writing, the maintainers have not responded to that
request, and no decision has been announced. Organizations should therefore
assume that future releases may continue to use the existing package ID.

An automated upgrade creates a licensing review consideration rather than a
technical compatibility problem. Organizations should evaluate the applicability
of the fee against the criteria described in the [OSMF consumer
FAQ](https://opensourcemaintenancefee.org/consumers/faq/) and their own
circumstances.

If your organization maintains a source build with a direct Polly package
reference and does not wish to automatically adopt a post-adoption version,
common options include:

- Pinning the Polly version.
- Configuring Dependabot, Renovate, or similar tools to ignore Polly package
  updates.
- Reviewing and accepting future updates on a case-by-case basis.

Organizations that choose to adopt a post-adoption release should review the
fee and related terms directly from the Polly project.

## What the Alliance is doing

We are removing the direct Polly dependency from our main development branches,
replacing it with `Microsoft.Extensions.Resilience`. That package depends on
Polly transitively, aligning Ed-Fi and its implementers more closely with the
transitive-dependency scenario described in the [OSMF consumer
FAQ](https://opensourcemaintenancefee.org/consumers/faq/).

This work is scheduled to complete before the next release of each affected
product. Organizations that add their own direct Polly reference, such as in a
fork or custom distribution, should evaluate their own position independently;
see "What implementers should do" below.

**We are not backporting this change to released versions**, because those
versions reference pre-adoption Polly packages and are unaffected.

## What implementers should do

- **Existing deployments:** no action is required. Continue operating on your
  current upgrade and maintenance schedule.
- **Upgrading to a future Ed-Fi release:** nothing specific. Those releases are
  expected to remove the direct Polly dependency.
- **If you maintain a fork or a distribution that adds its own direct Polly
  reference:** evaluate your own position against the criteria in the [OSMF
  consumer FAQ](https://opensourcemaintenancefee.org/consumers/faq/),
  particularly if your organization meets the revenue threshold.
- **If you run automated dependency updates over a source build:** review
  whether a Polly version bump after 16 November 2026 is something you want to
  accept, and pin or ignore the package if it is not. See "What about automated
  dependency updates?" above.

The practical outcome is that current Ed-Fi deployments are unaffected, future
releases will remove the direct Polly dependency, and no action is required from
most implementers.

Questions about this advisory can be raised through the [Ed-Fi Community
Hub](https://community.ed-fi.org) or [Slack](https://ed-fi-alliance.slack.com/).
