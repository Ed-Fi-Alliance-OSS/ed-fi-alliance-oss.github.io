# Administrative Security

Whereas the authorization tactics discussed in [Patterns for Row-Level User
Security](../user-guide/patterns-for-row-level-user-security.md)
affect end-users directly, these _administrative_ practices apply to the systems
behind the scenes.

## Restrict Access By Role

:::tip

Objective: limit a database user's access.

:::

The Analytics Middle Tier has been designed to support BI tools that operate
most efficiently when pulling data directly from a database, rather than
sourcing from APIs or files. Direct access to the middle tier database is an
assumed requirement. To support this, the SQL Server account used to connect to
the ODS can be placed in the `analytics_middle_tier` role, which will instantly
grant read-only access to the dimensional view. Limiting that account to only
this role will prevent that account from accessing any of the underlying data in
the ODS. See the [AMT Deployment Guide](./readme.mdx) for more
information.

Some BI tools support a "direct query mode" that bypasses the analytics database
in favor of executing a SQL query against the source database. Aside from
the [performance
concerns](./limiting-impact-on-the-production-ods.md) of
allowing direct query access, there is also a security concern. Generally it
will be preferable to manage end-user access only through the BI tool's data
model and not allow direct end-user queries.

## Encryption in Transit

:::tip

Objective: protect data as it passes through the network, from the SQL Server to
the analytics engine.

:::

Whenever possible, the connection from a BI tool to SQL Server should use an
encrypted connection (TLS). When using a connection string with SQL Server
Native Client, add the following to that
string: `Trusted_Connection=yes;Encrypt=yes;`.

It may also be necessary to [enable encrypted connections in SQL
Server](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/enable-encrypted-connections-to-the-database-engine?view=sql-server-2017).

If encrypted connections are not an option, then placing the analytics engine
and SQL Server together in an isolated (i.e., firewalled) network segment can
mitigate the risk of someone maliciously reading network packets that are sent
in the clear.

## Encryption at Rest

:::tip

Objective: protect data in storage.

:::

Whether or not to encrypt data at rest is a decision that each organization
needs to analyze carefully. SQL Server hosting the ODS has [multiple
options](https://www.microsoft.com/en-us/sql-server/data-security) for
encryption, although [Transparent Data
Encryption](https://docs.microsoft.com/en-us/sql/relational-databases/security/encryption/transparent-data-encryption?view=sql-server-2017) is
the only option that works without modifying the ODS database.

Analytics databases may or may not support encryption at rest, and implementors
will need to investigate their BI platform of choice to determine what it is
capable of. For example, Amazon QuickSight does offer encryption at rest when
using the [Enterprise
plan](https://docs.aws.amazon.com/quicksight/latest/user/editions.html). Data
stored in [Azure Analysis
Services](https://docs.microsoft.com/en-us/azure/analysis-services/analysis-services-overview) are
always encrypted at rest.
