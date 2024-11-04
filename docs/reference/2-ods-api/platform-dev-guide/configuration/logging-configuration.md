# Logging Configuration

The as-shipped Ed-Fi ODS / API uses the Apache log4net framework to assist
developers and operations staff log system output at a variety of output levels
and to a variety of output targets. The [log4net
documentation](https://logging.apache.org/log4net/release/features.html)
provides an overview of the framework capabilities and options. The
documentation is excellent, so we won't repeat the basics here.

Logging settings for the ODS / API itself and the ODS / API Administration
portal can be configured separately. This page provides example logging
configurations for specific scenarios.

## Default Release Configuration

This configuration is found in the as-shipped ODS / API source. This
configuration routes all log messages at the WARN level or above to a rolling
file log. This will log to a single file with up to two backup files, and the
space taken by each file will not exceed 20MB. This represents the default
configuration for a release build.

```xml
<log4net>
  <appender name="RollingFileAppender" type="log4net.Appender.RollingFileAppender">
    <threshold value="WARN" />
    <file value="WebApiLog.log" />
    <appendToFile value="true" />
    <maximumFileSize value="20MB" />
    <maxSizeRollBackups value="7" />
    <layout type="log4net.Layout.PatternLayout">
     <conversionPattern value="%date [%thread,%property{ApiClientId},%property{CorrelationId}] %-5level %logger - MESSAGE: %message%newline %exception" />
    </layout>
  </appender>
  <logger name="NHibernate">
    <level value="WARN"/>
  </logger>
  <root>
    <appender-ref ref="RollingFileAppender" />
  </root>
</log4net>
```

## Default Local Developer Configuration

This configuration routes all logging messages at the INFO level or above to the
Trace output (i.e., Console), and also provides a file appender for a stable log
file to review. In addition, this configuration provides a separate
Request-Response log file, which logs ERROR level request-response details
containing ApiClientId, Request Url, Request Method, Response Code, and Response
Message for all Resource endpoints. This represents the default configuration
for a debug build.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<log4net>
  <appender name="TraceAppender" type="log4net.Appender.TraceAppender">
    <threshold value="INFO" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date [%thread,%property{ApiClientId},%property{CorrelationId}] %-5level %logger{1}.%method [%line] - MESSAGE: %message%newline %exception" />
    </layout>
  </appender>
  <appender name="RollingFile" type="log4net.Appender.RollingFileAppender">
    <threshold value="WARN" />
    <file value="WebApiLog.log" />
    <appendToFile value="true" />
    <maximumFileSize value="100KB" />
    <maxSizeRollBackups value="7" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date [%thread,%property{ApiClientId},%property{CorrelationId}] %-5level %logger - MESSAGE: %message%newline %exception" />
    </layout>
  </appender>
  <appender name="ConsoleAppender" type="log4net.Appender.ConsoleAppender">
    <threshold value="INFO" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date [%thread,%property{ApiClientId},%property{CorrelationId}] %-5level %logger{1} - %message%newline" />
    </layout>
  </appender>
  <appender name="AppInsightsAppender" type="Microsoft.ApplicationInsights.Log4NetAppender.ApplicationInsightsAppender, Microsoft.ApplicationInsights.Log4NetAppender">
    <threshold value="WARN" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%message%newline" />
    </layout>
  </appender>
  <logger name="NHibernate">
    <level value="WARN"/>
  </logger>
  <root>
    <appender-ref ref="ConsoleAppender" />
    <appender-ref ref="RollingFile" />
    <appender-ref ref="TraceAppender" />
    <appender-ref ref="AppInsightsAppender" />
  </root>
  <logger name="RequestResponseDetailsLogger" additivity="false">
    <level value="ERROR" />
    <appender-ref ref="RequestResponseDetailsFileAppender" />
  </logger>
  <appender name="RequestResponseDetailsFileAppender" type="log4net.Appender.RollingFileAppender">
    <threshold value="ERROR" />
    <file value="WebApiRequestResponseDetailsLog.log"/>
    <appendToFile value="true"/>
    <maximumFileSize value="100KB" />
    <maxSizeRollBackups value="7" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date [%thread] %-5level ClientId:%property{ApiClientId} CorrelationId:%property{CorrelationId} RequestUrl:%property{RequestUrl} RequestMethod:%property{RequestMethod} ResponseCode:%property{ResponseCode} ResponseMessage:%message%n" />
    </layout>
  </appender>
</log4net>
```

To disable Request-Response logs, remove both logger
RequestResponseDetailsLogger and appender RequestResponseDetailsFileAppender
from the configuration file.

## Example Support Configuration

In production, it's often useful to log more activity such as when
troubleshooting a difficult-to-reproduce issue. This example configuration
routes all logging messages at the DEBUG level or above (i.e., all logging
messages) to a rolling file log. This will log a large amount of information and
should not be left on after reproducing the issue for the support ticket. It
increases the rolling size-per-file value to 100MB to ensure all the data is
collected, but reduces the number of backup files to one single file. After
enabling this configuration, detailed files can be inspected to aid in
troubleshooting.

```xml
<log4net>
  <appender name="RollingFileAppender" type="log4net.Appender.RollingFileAppender">
    <threshold value="DEBUG" />
    <file value="WebApiLog.log" />
    <appendToFile value="true" />
    <maximumFileSize value="100MB" />
    <maxSizeRollBackups value="7" />
    <layout type="log4net.Layout.PatternLayout">      
       <conversionPattern value="%date [%thread,%property{ApiClientId},%property{CorrelationId}] %-5level %logger - MESSAGE: %message%newline %exception" />     
    </layout>
  </appender>
  <logger name="NHibernate">
    <level value="WARN"/>
  </logger>
  <root>
    <appender-ref ref="RollingFileAppender" />
  </root>
</log4net>
```

To further aid production troubleshooting, RequestResponseDetailsLogger can be
configured to log request/response JSON to the ODS associated with the API
request. See [How To: Enable logging API request and response
content](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V72/pages/23301585/How+To%3A+Enable+logging+API+request+and+response+content)
for details.

## Correlation ID

The Correlation ID is a unique identifier associated with each API request's
lifecycle. Log entries and API error responses related to a specific client
request will include the Correlation ID. The Correlation ID provides a means of
identifying log entries associated with the lifecycle of a particular request.

### Example 1: API error response body containing a Correlation ID

```json
{
  "detail": "Identifying values for the Calendar data cannot be changed. Delete and recreate the item instead.",
  "type": "urn:ed-fi:api:bad-request:data-validation-failed:key-change-not-supported",
  "title": "Key Change Not Supported",
  "status": 400,
  "correlationId": "b9567d36-91c1-4bae-aff5-3fde8367b969"
}
```

### Example 2

a log entry created during the same request used for Example 1
demonstrates that it contains the same Correlation ID.

```text
2024-05-29 11:40:00,268 [.NET TP Worker,2,b9567d36-91c1-4bae-aff5-3fde8367b969] ERROR EdFi.Ods.Api.Services.Controllers.Calendars.EdFi.CalendarsController - MESSAGE: Put
 EdFi.Ods.Common.Exceptions.KeyChangeNotSupportedException: Identifying values for the Calendar data cannot be changed. Delete and recreate the item instead.
```

API clients (or infrastructure capable of modifying the HTTP request in transit
to the API) can optionally specify the Correlation ID for each request. If a
request is received which does not specify a Correlation ID, the ODS will
generate a GUID to serve as the correlation ID for that remainder of the
request's lifecycle.

:::info

Requests to the API which result in an error response (HTTP codes 500
or 4xx) generate corresponding log entries at the level ERROR.

:::

### Specifying the Correlation ID for a Request

API requests can optionally provide their own Correlation ID value in one of two
ways:

* Including it in a query string parameter named '**correlationId**'
* Including it as an HTTP header named **'correlation-id**'

When the Correlation ID is specified in API requests, it must be ensured that
the Correlation ID used for each request is unique. Creating a GUID to serve as
the Correlation ID for each request is a straightforward and reliable approach.

:::info

Although setting a Correlation ID value in both the query string and
HTTP header on the same request is never necessary, the ODS will use the value
from the HTTP header if that situation arises.

:::

:::tip

To maximize the utility of the Correlation ID, it should be added to an
API request as early in its lifecycle as possible. This allows other
infrastructure or services between the API client and ODS instance the
opportunity to incorporate the Correlation ID into their logging.

:::

### Example 3

A query string parameter is used to specify the Correlation ID

```text
GET /data/v3/ed-fi/schools?offset=0&limit=1&totalCount=false?correlationId=b9567d36-91c1-4bae-aff5-3fde8367b969 HTTP/1.1
Host: localhost:54746
Accept: application/json
Use-Snapshot: false
Authorization: Bearer 7965b8a43edb4c9fa22c4529e96b0ec8
```

### Example 4

An HTTP header is used to specify the Correlation ID

```text
GET /data/v3/ed-fi/schools?offset=0&limit=1&totalCount=false HTTP/1.1
Host: localhost:54746
Accept: application/json
Use-Snapshot: false
Authorization: Bearer 7965b8a43edb4c9fa22c4529e96b0ec8
correlation-id: b9567d36-91c1-4bae-aff5-3fde8367b969
```
