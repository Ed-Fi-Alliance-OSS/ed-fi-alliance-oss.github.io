# How to fix SQL Server certificate issues with 6.1

WIth the latest (tags/v6.1-patch2) branch of 6.1, lots of folks are seeing SQL Server Certificate errors during the initdev process. The following work-around can be used until the community has had a chance to come up with some guidance on best practices for trusting SQL Server certificates.

**SQL Server certificate error** Expand source

```sh
Invoke-SqlScript : ERROR: Microsoft.SqlServer.Management.Common.ConnectionFailureException: Failed to
connect to server (local). ---> Microsoft.Data.SqlClient.SqlException: A connection was successfully
established with the server, but then an error occurred during the login process. (provider: SSL Provider,
error: 0 - The certificate chain was issued by an authority that is not trusted.) --->
System.ComponentModel.Win32Exception: The certificate chain was issued by an authority that is not trusted
   --- End of inner exception stack trace ---
   at Microsoft.Data.SqlClient.SqlInternalConnection.OnError(SqlException exception, Boolean
breakConnection, Action`1 wrapCloseInAction)
   at Microsoft.Data.SqlClient.TdsParser.ThrowExceptionAndWarning(TdsParserStateObject stateObj, Boolean
callerHasConnectionLock, Boolean asyncClose)
   at Microsoft.Data.SqlClient.TdsParserStateObject.SNIWritePacket(SNIHandle handle, SNIPacket packet,
UInt32& sniError, Boolean canAccumulate, Boolean callerHasConnectionLock, Boolean asyncClose)
   at Microsoft.Data.SqlClient.TdsParserStateObject.WriteSni(Boolean canAccumulate)
   at Microsoft.Data.SqlClient.TdsParserStateObject.WritePacket(Byte flushMode, Boolean canAccumulate)
   at Microsoft.Data.SqlClient.TdsParser.TdsLogin(SqlLogin rec, FeatureExtension requestedFeatures,
SessionData recoverySessionData, FederatedAuthenticationFeatureExtensionData fedAuthFeatureExtensionData,
SqlClientOriginalNetworkAddressInfo originalNetworkAddressInfo, SqlConnectionEncryptOption encrypt)
   at Microsoft.Data.SqlClient.SqlInternalConnectionTds.Login(ServerInfo server, TimeoutTimer timeout,
String newPassword, SecureString newSecurePassword, SqlConnectionEncryptOption encrypt)
   at Microsoft.Data.SqlClient.SqlInternalConnectionTds.AttemptOneLogin(ServerInfo serverInfo, String
newPassword, SecureString newSecurePassword, Boolean ignoreSniOpenTimeout, TimeoutTimer timeout, Boolean
withFailover, Boolean isFirstTransparentAttempt, Boolean disableTnir)
   at Microsoft.Data.SqlClient.SqlInternalConnectionTds.LoginNoFailover(ServerInfo serverInfo, String
newPassword, SecureString newSecurePassword, Boolean redirectedUserInstance, SqlConnectionString
connectionOptions, SqlCredential credential, TimeoutTimer timeout)
   at Microsoft.Data.SqlClient.SqlInternalConnectionTds.OpenLoginEnlist(TimeoutTimer timeout,
SqlConnectionString connectionOptions, SqlCredential credential, String newPassword, SecureString
newSecurePassword, Boolean redirectedUserInstance)
   at Microsoft.Data.SqlClient.SqlInternalConnectionTds..ctor(DbConnectionPoolIdentity identity,
SqlConnectionString connectionOptions, SqlCredential credential, Object providerInfo, String newPassword,
SecureString newSecurePassword, Boolean redirectedUserInstance, SqlConnectionString userConnectionOptions,
SessionData reconnectSessionData, ServerCertificateValidationCallback serverCallback,
ClientCertificateRetrievalCallback clientCallback, DbConnectionPool pool, String accessToken,
SqlClientOriginalNetworkAddressInfo originalNetworkAddressInfo, Boolean applyTransientFaultHandling)
   at Microsoft.Data.SqlClient.SqlConnectionFactory.CreateConnection(DbConnectionOptions options,
DbConnectionPoolKey poolKey, Object poolGroupProviderInfo, DbConnectionPool pool, DbConnection
owningConnection, DbConnectionOptions userOptions)
   at Microsoft.Data.ProviderBase.DbConnectionFactory.CreatePooledConnection(DbConnectionPool pool,
DbConnection owningObject, DbConnectionOptions options, DbConnectionPoolKey poolKey, DbConnectionOptions
userOptions)
   at Microsoft.Data.ProviderBase.DbConnectionPool.CreateObject(DbConnection owningObject,
DbConnectionOptions userOptions, DbConnectionInternal oldConnection)
   at Microsoft.Data.ProviderBase.DbConnectionPool.UserCreateRequest(DbConnection owningObject,
DbConnectionOptions userOptions, DbConnectionInternal oldConnection)
   at Microsoft.Data.ProviderBase.DbConnectionPool.TryGetConnection(DbConnection owningObject, UInt32
waitForMultipleObjectsTimeout, Boolean allowCreate, Boolean onlyOneCheckConnection, DbConnectionOptions
userOptions, DbConnectionInternal& connection)
   at Microsoft.Data.ProviderBase.DbConnectionPool.TryGetConnection(DbConnection owningObject,
TaskCompletionSource`1 retry, DbConnectionOptions userOptions, DbConnectionInternal& connection)
   at Microsoft.Data.ProviderBase.DbConnectionFactory.TryGetConnection(DbConnection owningConnection,
TaskCompletionSource`1 retry, DbConnectionOptions userOptions, DbConnectionInternal oldConnection,
DbConnectionInternal& connection)
   at Microsoft.Data.ProviderBase.DbConnectionInternal.TryOpenConnectionInternal(DbConnection
outerConnection, DbConnectionFactory connectionFactory, TaskCompletionSource`1 retry, DbConnectionOptions
userOptions)
   at Microsoft.Data.SqlClient.SqlConnection.TryOpenInner(TaskCompletionSource`1 retry)
   at Microsoft.Data.SqlClient.SqlConnection.TryOpen(TaskCompletionSource`1 retry, SqlConnectionOverrides
overrides)
   at Microsoft.Data.SqlClient.SqlConnection.Open(SqlConnectionOverrides overrides)
   at Microsoft.SqlServer.Management.Common.ConnectionManager.InternalConnectImpl()
   at Microsoft.SqlServer.Management.Common.ConnectionManager.InternalConnect()
   at Microsoft.SqlServer.Management.Common.ConnectionManager.Connect()
   --- End of inner exception stack trace ---
   at Microsoft.SqlServer.Management.Common.ConnectionManager.Connect()
   at Microsoft.SqlServer.Management.Common.ServerConnection.ExecuteNonQuery(String sqlCommand,
ExecutionTypes executionType, Boolean retry)
   at CallSite.Target(Closure , CallSite , Object , Object )
At C:\Repo\Ed-Fi-ODS-Implementation\logistics\scripts\modules\database\database-management.psm1:524 char:16
+ ...      return Invoke-SqlScript $newsqlscript -returnDataSet:$returnData ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [Write-Error], WriteErrorException
    + FullyQualifiedErrorId : Microsoft.PowerShell.Commands.WriteErrorException,Invoke-SqlScript
Exception calling "ExecuteNonQuery" with "1" argument(s): "Failed to connect to server (local)."
At C:\Repo\Ed-Fi-ODS-Implementation\logistics\scripts\modules\database\database-management.psm1:553 char:25
+ ...             $srv.ConnectionContext.ExecuteNonQuery($sqlToExecute) | O ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:) [], MethodInvocationException
    + FullyQualifiedErrorId : ConnectionFailureException
```

To fix this issue,

* drop all EdFi SQL Server databases before running initdev
* update the file Ed-Fi-ODS-Implementation/logistics/scripts/modules/settings/settings-management.psm1 to include "TrustServerCertificate=True " in the connection strings. (strings 213-216)

    **original**

    ```powershell
    SQLServer = @{
    ConnectionStrings = @{
    ((Get-ConnectionStringKeyByDatabaseTypes)[(Get-DatabaseTypes).Ods]) = "Server=(local); Trusted_Connection=True; Database=EdFi_{0};"
    ((Get-ConnectionStringKeyByDatabaseTypes)[(Get-DatabaseTypes).Admin]) = "Server=(local); Trusted_Connection=True; Database=EdFi_Admin;"
    ((Get-ConnectionStringKeyByDatabaseTypes)[(Get-DatabaseTypes).Security]) = "Server=(local); Trusted_Connection=True; Database=EdFi_Security; Persist Security Info=True;"
    ((Get-ConnectionStringKeyByDatabaseTypes)[(Get-DatabaseTypes).Master]) = "Server=(local); Trusted_Connection=True; Database=master;"
    }
    }


    ```

    **after**

    ```powershell
    SQLServer = @{
    ConnectionStrings = @{
    ((Get-ConnectionStringKeyByDatabaseTypes)[(Get-DatabaseTypes).Ods]) = "Server=(local); Trusted_Connection=True; Database=EdFi_{0};TrustServerCertificate=True;"
    ((Get-ConnectionStringKeyByDatabaseTypes)[(Get-DatabaseTypes).Admin]) = "Server=(local); Trusted_Connection=True; Database=EdFi_Admin;TrustServerCertificate=True;"
    ((Get-ConnectionStringKeyByDatabaseTypes)[(Get-DatabaseTypes).Security]) = "Server=(local); Trusted_Connection=True; Database=EdFi_Security; Persist Security Info=True;TrustServerCertificate=True;"
    ((Get-ConnectionStringKeyByDatabaseTypes)[(Get-DatabaseTypes).Master]) = "Server=(local); Trusted_Connection=True; Database=master;TrustServerCertificate=True;"
    }
    }


    ```

* run initdev
