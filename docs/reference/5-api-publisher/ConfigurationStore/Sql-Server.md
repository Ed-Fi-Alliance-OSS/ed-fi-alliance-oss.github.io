# SQL Server

Enables management of individual connection settings with encryption support for
securely storing keys and secrets using built-in support for symmetric key
encryption in a SQL Server database.

## Create the Ed-Fi API Publisher Configuration Database

The following script template provides you with the information needed to create
the `EdFi_API_Publisher_Configuration` database. Alternatively, you can perform
this step manually using SSMS or through some other means and proceed with the
next step.

To provide parameters for the script, type
<kbd>Ctrl</kbd>+<kbd>Shft</kbd>+<kbd>M</kbd> in the SSMS query window before
executing.

```sql
-- IMPORTANT: Type Ctrl+Shft+M to enter parameters for the script.

---------------------------------------------------------
-- Create configuration database
---------------------------------------------------------
CREATE DATABASE [EdFi_API_Publisher_Configuration]
 ON PRIMARY (
   NAME = N'EdFi_API_Publisher_Configuration',
   FILENAME = N'< DataFilePath, nvarchar, C:\MSSQL\DATA\EdFi_API_Publisher_Configuration.mdf >'
 )
 LOG ON (
   NAME = N'EdFi_API_Publisher_Configuration_log',
   FILENAME = N'< LogFilePath, nvarchar, C:\MSSQL\LOG\EdFi_API_Publisher_Configuration_log.ldf >'
)
GO
```

## Create the EdFiApiPublisher User

The Ed-Fi ODS API Publisher is intended to use integrated security to connect to
the configuration database. To that end, the process under which the publisher
utility is executing should be a local or domain Windows identity with an
associated SQL Server login named "EdFiOdsApiPublisher".

To provide parameters for the script, type
<kbd>Ctrl</kbd>+<kbd>Shft</kbd>+<kbd>M</kbd> in the SSMS query window before
executing.

```sql
-- IMPORTANT: Type Ctrl+Shft+M to enter parameters for the script.

USE [master]
GO
CREATE LOGIN [<Domain or Machine Name, nvarchar, DOMAIN_OR_MACHINE>\<User Name, nvarchar, WindowsUserName>]
  FROM WINDOWS WITH DEFAULT_DATABASE=[EdFi_API_Publisher_Configuration]
GO
USE [EdFi_API_Publisher_Configuration]
GO
CREATE USER [EdFiApiPublisher] FOR LOGIN
  [<Domain or Machine Name, nvarchar, DOMAIN_OR_MACHINE>\<User Name, nvarchar, WindowsUserName>]
GO
ALTER ROLE [db_datareader] ADD MEMBER [EdFiApiPublisher]
GO
ALTER ROLE [db_datawriter] ADD MEMBER [EdFiApiPublisher]
GO
```

## Create the Tables and Initialize Encryption Artifacts

The following script will create the necessary configuration tables,
certificate, and symmetric key needed to support the Ed-Fi ODS API Publisher's
connection configuration management functionality.

To provide parameters for the script, type
<kbd>Ctrl</kbd>+<kbd>Shft</kbd>+<kbd>M</kbd> in the SSMS query window before
executing.

```sql
-- IMPORTANT: Type Ctrl+Shft+M to enter parameters for the script.

USE [EdFi_API_Publisher_Configuration]
GO

---------------------------------------------------------
-- Create configuration table
---------------------------------------------------------
CREATE TABLE [dbo].[ConfigurationValue](
    [ConfigurationKey] [nvarchar](450) NOT NULL,
    [ConfigurationValue] [nvarchar](max) NULL,
    [ConfigurationValueEncrypted] [varbinary](max) NULL,
 CONSTRAINT [PK_ConfigurationValue] PRIMARY KEY CLUSTERED ([ConfigurationKey] ASC)
)
GO

---------------------------------------------------------
-- Create encryption certificate and keys
---------------------------------------------------------

-- Create database master key
CREATE MASTER KEY
ENCRYPTION BY PASSWORD = '< MasterKeyPassword, nvarchar, Change#Me%Now>';

-- Create certificate
CREATE CERTIFICATE EdFiApiPublisherConfigCert
   WITH SUBJECT = 'Ed-Fi API Publisher Configuration Secrets';

-- Create a symmetric key for encryption
CREATE SYMMETRIC KEY EdFiApiPublisherConfigKey
    WITH ALGORITHM = AES_256
    ENCRYPTION BY CERTIFICATE EdFiApiPublisherConfigCert;

-------------------------------------------------------------------
```

## Create the Encryption User

The configuration implementation for SQL Server provides the ability to encrypt
sensitive values like API keys and secrets. A database level user named
"EdFiEncryption" is created and granted the necessary permissions to perform all
encryption and decryption of the configuration values on behalf of the caller
through the `dbo.GetConfigurationValue` and `dbo.SetConfigurationValue` stored
procedures (which are created in the next step).

Execute the following script to create the database-level user account used for
encryption.

```sql
USE [EdFi_API_Publisher_Configuration]
GO
CREATE USER [EdFiEncryption] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
use [EdFi_API_Publisher_Configuration]
GO
GRANT CONTROL ON CERTIFICATE::[EdFiApiPublisherConfigCert] TO [EdFiEncryption]
GO
use [EdFi_API_Publisher_Configuration]
GO
GRANT VIEW DEFINITION ON SYMMETRIC KEY::[EdFiApiPublisherConfigKey] TO [EdFiEncryption]
GO
use [EdFi_API_Publisher_Configuration]
GO
GRANT DELETE ON [dbo].[ConfigurationValue] TO [EdFiEncryption]
GO
use [EdFi_API_Publisher_Configuration]
GO
GRANT INSERT ON [dbo].[ConfigurationValue] TO [EdFiEncryption]
GO
use [EdFi_API_Publisher_Configuration]
GO
GRANT SELECT ON [dbo].[ConfigurationValue] TO [EdFiEncryption]
GO
use [EdFi_API_Publisher_Configuration]
GO
GRANT UPDATE ON [dbo].[ConfigurationValue] TO [EdFiEncryption]
GO
```

## Create User-Defined Functions for Managing Encrypted Configuration Entries

```sql
CREATE OR ALTER PROCEDURE dbo.SetConfigurationValue
    @configurationKey nvarchar(450),
    @plaintext nvarchar(max),
    @encrypt bit = 0
WITH EXECUTE AS 'EdFiEncryption'
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION

    DELETE FROM dbo.ConfigurationValue
    WHERE ConfigurationKey = @configurationKey;

    IF @encrypt = 0
        INSERT INTO dbo.ConfigurationValue(ConfigurationKey, ConfigurationValue)
        VALUES (@configurationKey, @plaintext)
    ELSE
        BEGIN
            -- Open the symmetric key with which to encrypt the data.
            OPEN SYMMETRIC KEY EdFiApiPublisherConfigKey
            DECRYPTION BY CERTIFICATE EdFiApiPublisherConfigCert;

            DECLARE @encrypted varbinary(max);

            -- Encrypt the value
            SET @encrypted = EncryptByKey(Key_GUID('EdFiApiPublisherConfigKey'),
                @plaintext, 1, HashBytes('SHA1', CONVERT(varbinary, @configurationKey)));

            INSERT INTO dbo.ConfigurationValue(ConfigurationKey, ConfigurationValueEncrypted)
            VALUES (@configurationKey, @encrypted)

            CLOSE SYMMETRIC KEY EdFiApiPublisherConfigKey
        END

    COMMIT TRANSACTION;
END
GO

CREATE OR ALTER PROCEDURE dbo.GetConfigurationValues
    @configurationKeyPrefix nvarchar(450) = null
WITH EXECUTE AS 'EdFiEncryption'
AS
BEGIN
    SET NOCOUNT ON;

    -- Open the symmetric key with which to encrypt the data.
    OPEN SYMMETRIC KEY EdFiApiPublisherConfigKey
    DECRYPTION BY CERTIFICATE EdFiApiPublisherConfigCert;

    SELECT c.ConfigurationKey,
        COALESCE(c.ConfigurationValue,
            Convert(nvarchar, DecryptByKey(c.ConfigurationValueEncrypted, 1,
              HashBytes('SHA1', CONVERT(varbinary, c.ConfigurationKey))))
            )
            AS ConfigurationValue
    FROM dbo.ConfigurationValue c
    WHERE ConfigurationKey LIKE COALESCE(@configurationKeyPrefix, '') + '%'

    CLOSE SYMMETRIC KEY EdFiApiPublisherConfigKey
END
GO

GRANT EXECUTE ON [dbo].[GetConfigurationValues] TO
  [<Domain or Machine Name, nvarchar, DOMAIN_OR_MACHINE>\<User Name, nvarchar, EdFiApiPublisher>]
GRANT EXECUTE ON [dbo].[SetConfigurationValue] TO
  [<Domain or Machine Name, nvarchar, DOMAIN_OR_MACHINE>\<User Name, nvarchar, EdFiApiPublisher>]
```

## Configure API Connections

Create new API connections by pasting the following SQL template into an SSMS
query window and typing Ctrl+Shft+M to enter the necessary parameters. The
resulting script can then be executed to create or update the specified API
connection, with an encrypted key and secret.

```sql
EXEC    [dbo].[SetConfigurationValue]
        @configurationKey = N'/ed-fi/apiPublisher/connections/< ConnectionName, nvarchar, Name >/url',
        @plaintext = N'< Url, nvarchar, http://localhost:54746/ >'
GO

EXEC    [dbo].[SetConfigurationValue]
        @configurationKey = N'/ed-fi/apiPublisher/connections/< ConnectionName, nvarchar, Name >/key',
        @plaintext = N'<Key, nvarchar, the_key>',
        @encrypt = 1
GO

EXEC    [dbo].[SetConfigurationValue]
        @configurationKey = N'/ed-fi/apiPublisher/connections/< ConnectionName, nvarchar, Name >/secret',
        @plaintext = N'< Secret, nvarchar, the_secret >',
        @encrypt = 1
GO
```

![SQL Server Configuration
Store](../img/Sql-Server-configuration-store-example.png)

## Configure API Publisher

To use the SQL Server Configuration Store, change the `provider` setting in the
_configurationStoreSettings.json_ file to `sqlServer` and supply the connection
string, as shown below:

```json
{
  "configurationStore": {
    "provider": "sqlServer",
    "sqlServer": {
      "connectionString": "Server=(local);Database=EdFi_API_Publisher_Configuration;Trusted_Connection=True"
    }
  }
}
```
