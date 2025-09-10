# Support Notifications

## Overview

The Ed-Fi Alliance regularly reviews its technology products to assess their
fitness for current strategic goals and our ability to continue maintaining
them. Older versions need to move out of support, and sometimes entire product
lines are retired.

* Fully supported products receive new features and compatibility updates /
  testing with related software, in addition to bug / security fixes and
  framework / dependency updates.
* Maintenance mode products receive framework / dependency updates and critical
  bug / security fixes. They do not receive new features and may be incompatible
  with newer versions of other software
* Example: Ed-Fi ODS Admin App is now in maintenance mode as of December, 2023.
  It will be updated to .NET 8 all all NuGet package dependencies will be
  brought up to date. But there will be no new features, and it will not become
  compatible with Ed-Fi ODS/API 7.x.
* A product line that is still a core part of the Ed-Fi Technology Suite offering may
  remain fully supported while older versions eventually fall out of support,
  for example in 2023, we ended support for Ed-Fi ODS/API versions less than
  5.3.
* Or, a product may be moved to the Ed-Fi Exchange for community support. The
  Alliance tech team will not formally offer updates, though we remain open to a
  conversation about bug / security fixes on a case-by-case basis.

![Diagram of support levels](/img/reference/support-notifications.jpg)

:::tip

Specific notices may be provided for individual products, and those notices may
provide additional details or guidance for uses of the affected products and
versions. Specific end-of-support notices are listed in the panel to the right
of this text.

→ See [Ed-Fi Technology Suite Supported Versions](../supported-versions.md) for
a detailed view of which products and versions are currently in or out of
support.

:::

## Description

### What changes when a product or version of a product is out-of-support?

* Support tickets on out-of-support versions will receive lower priority or be
  closed without investigation.
* The Alliance will stop releasing updates or enhancements to out of support
  products.
* If applicable, code repositories are marked as archived or similar, and README
  files are updated to reflect the current status. These repositories may move
  to the Ed-Fi Exchange.
  * This may not be possible if the product repository still has supported
    versions.
* The Alliance will stop monitoring codebases and running processes designed to
  monitor security and vulnerability of Ed-Fi Technology Suite.
* The Alliance may withdraw or change training content that includes references
  to out-of-support products.
* Alliance help desk services will not provide support for installation,
  configuration or other usage of products that are out-of-support.
* The Alliance starts allocating additional resources and budgets towards other
  technical efforts.
* No new Ed-Fi credentials will be created for an out-of-support product.
  Existing Ed-Fi credentials will not be renewed.

### What doesn't change?

* Ed-Fi community members will continue to have full access to source code,
  under the existing open source license.
* All existing documentation on will be retained, though it may be moved to
  another location in order to ensure that technical documentation remains
  uncluttered and friendly.
* Ed-Fi community members will continue to have full access to source code,
  under the existing open source license.
* Some of the tooling that the Alliance uses to monitor and maintain this
  security of the affected product may be available for others to use; please
  contact the  Alliance if this is of interest.
* If guidance on upgrade to a supported version exists, the Alliance will
  provide help desk services to support this change. However, support for this
  process may be limited due to complexity or cost in investigating older
  versions; users of products are therefore advised to migrate while products
  are still supported.
* Ed-Fi community members can continue to offer support services based on
  out-of-support products. This is not recommended.
* Any existing badges/certifications impacted by an out-of-support product will
  remain in place until the credential expires.
