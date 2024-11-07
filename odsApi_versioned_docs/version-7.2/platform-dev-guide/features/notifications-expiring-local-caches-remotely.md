# Notifications (Expiring Local Caches Remotely)

The "Notifications" feature of the API enables integration with a messaging
solution allowing the API to receive messages and perform actions in response.

Initial support is provided for expiring in-memory caches immediately in API
processes (rather than waiting for configured expirations) using the Redis
Pub/Sub functionality.

## Feature Configuration

To enable this behavior, make the following configuration changes
in _appSettings.json_:

1. Enable the Notifications feature.

    ```json
    {
        "Name": "Notifications",
        "IsEnabled": true
    }
    ```

2. Configure Redis (has moved to a new "Services" section of the
    configuration).

    ```json
    "Services": {
        "Redis": {
            "Configuration": "localhost"
        }
    },
    ```

3. Configure the Notifications feature. Specify the name of the Redis channel
    to monitor for messages and the minimum interval (by message type) that must
    transpire between messages for processing to occur. (The latter setting is
    there primarily as a safeguard against a DOS type attack or mistake causing
    repeated and unrelenting cache expirations on the API servers.)

    ```json
    "Notifications": {
        "Redis": {
            "Channel": "ed-fi-ods-api"
        },
        "MinimumIntervalSeconds": {
            "expire-cache": 300
        }
    },
    ```

## Explicit Cache Expiration

The initial use case supported by the Notifications feature enables hosts to
expire the in-memory cached data and metadata on API servers. There are no
facilities provided by the Ed-Fi technology suite for actually sending the
message, but the format of the message is very simple:

```json
{
    "type": "expire-cache",
    "data": {
        "cacheType": "(security|api-client-details|profile-metadata|ods-instances|descriptors)"
    }
}
```

* `security` - expires all cached security metadata, which could be useful to
    make security configuration changes effective immediately if (for example) a
    claim set's permissions or authorization strategies were modified.

* `api-client-details` - expires all cached information for API tokens,
    forcing the API client details to be reloaded from the Admin database, which
    could be useful to immediately terminate an API client's access.

* `profile-metadata` - expires all cached metadata related to API Profiles,
    which could be useful if a Profile definition is updated in the `EdFi_Admin`
    database.

* `ods-instances` - expires all cached details related to ODS instances, which
    may be useful if a connection string changes and the configuration source
    doesn't support notifications.

* `descriptors` \- expires all cached descriptor URI / DescriptorId mappings,
    which may be useful in an obscure scenario where descriptors are cached then
    deleted and re-added, resulting in invalid descriptor ids being used in
    database operations when processing API write requests.

To send a message using Redis that expires all cached security metadata on all
API servers, use the [publish](https://redis.io/docs/latest/commands/publish/)
command, as shown here:

```redis
publish "ed-fi-ods-api" "{'type':'expire-cache', 'data': { 'cacheType': 'security' } }"
```

## Extensibility

The Notifications feature provides seams for extensibility in terms of the
providing support for a different messaging infrastructure as well as for adding
custom messages and notification handlers to perform custom operations within
the scope of the API process.

The `INotificationsMessageSink` interface provides a basic abstraction for
delivering a message from the messaging infrastructure for processing. The
built-in implementation of this interface will then perform an in-memory
publishing of the message using [MediatR](https://github.com/jbogard/MediatR).
Here's the interface for delivering messages to this in-process notification
system:

```csharp
/// <summary>
/// Defines a method for receiving the string-based content of a notification message from a pub/sub infrastructure component.
/// </summary>
public interface INotificationsMessageSink
{
    /// <summary>
    /// Receives the JSON message content and initiates appropriate notification handling.
    /// </summary>
    /// <param name="messageContent">The JSON content of the notification message.</param>
    void Receive(string messageContent);
}
```

Redis support is provided during container registration using the following
code:

```csharp
var subscriber = _redisConnectionProvider.Get().Multiplexer.GetSubscriber();

subscriber.Subscribe(
    new RedisChannel(_redisNotificationSettings.Channel, PatternMode.Auto),
    (channel, message) => { _notificationsMessageSink.Receive(message); });
```

The published/handled messages should contain JSON that can be deserialized to
the following class:

```csharp
/// <summary>
/// Represents the JSON message body for notification messages published to the pub/sub messaging infrastructure.
/// </summary>
public class NotificationMessage
{
    public string Type { get; set; }
    public JObject Data { get; set; }
}
```

Once the message has been delivered to the message sink, a matching
`INotification` (from MediatR) implementation is identified by matching
the `type` property of the raw notification message with the value of a
`NotificationType` attribute on the notification class. The notification object
is then deserialized from the JSON supplied in the `data` property of the raw
notification message. The code below shows the implementation "expire-cache"
notification:

```csharp
/// <summary>
/// Represents a notification message sent to the Ed-Fi ODS API process to explicitly expire the cached security metadata.
/// </summary>
[NotificationType("expire-cache")]
public class ExpireCache : INotification
{
    public string CacheType { get; set; }
}
```

From here, the notification is published through Mediatr for in-process handling
by the appropriate `INotificationHandler<T>` implementation(s) (which must be
registered with the Autofac container). The following code snippet shows the
structure of the class implemented for handling cache expirations:

```csharp
/// <summary>
/// Handles the <see cref="ExpireCache" /> notification by clearing the underlying cache for the interceptor that
/// wraps all method invocations related to security metadata.
/// </summary>
public class ExpireCacheHandler : INotificationHandler<ExpireCache>
{
    public Task Handle(ExpireCache notification, CancellationToken cancellationToken)
    {
        ...
    }
}
```
