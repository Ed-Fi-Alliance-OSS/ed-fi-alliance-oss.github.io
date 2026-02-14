---
title: Logging Configuration
---

# Logging Configuration

The as-shipped Ed-Fi ODS / API uses the Apache log4net framework to assist developers and operations staff log system output at a variety of output levels and to a variety of output targets. The [log4net documentation](https://logging.apache.org/log4net/release/features.html) provides an overview of the framework capabilities and options. The documentation is excellent, so we won't repeat the basics here.

Logging settings for the ODS / API itself and the ODS / API Administration portal can be configured separately. This page provides example logging configurations for specific scenarios.

## Default Release Configuration

This configuration is found in the as-shipped ODS / API source. This configuration routes all log messages at the WARN level or above to a rolling file log. This will log to a single file with up to two backup files, and the space taken by each file will not exceed 20MB. This represents the default configuration for a release build.

```xml
<log4net>
  <appender name="RollingFileAppender" type="log4net.Appender.RollingFileAppender">
    <threshold value="WARN" />
    <file value="WebApiLog.log" />
    <appendToFile value="true" />
    <maximumFileSize value="20MB" />
    <maxSizeRollBackups value="7" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date [%thread] %-5level %logger - MESSAGE: %message%newline %exception" />
    </layout>
  </appender>
  <root>
    <level value="ALL" />
    <appender-ref ref="RollingFileAppender" />
  </root>
</log4net>
```

## Default Local Developer Configuration

This routes all logging messages at the INFO level or above to the Trace output (i.e., Console), and also provides a file appender for a stable log file to review. This represents the default configuration for a debug build.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<log4net>
  <appender name="TraceAppender" type="log4net.Appender.TraceAppender">
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date [%thread] %-5level %logger{1}.%method [%line] - MESSAGE: %message%newline %exception" />
    </layout>
  </appender>
  <appender name="DebugAppender" type="log4net.Appender.DebugAppender" >
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date [%thread] %-5level %logger - MESSAGE: %message%newline %exception" />
    </layout>
  </appender>
  <appender name="FileAppender" type="log4net.Appender.FileAppender">
    <threshold value="INFO" />
    <file value="WebApiLog.log" />
    <appendToFile value="true" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date [%thread] %-5level %logger - MESSAGE: %message%newline %exception" />
    </layout>
  </appender>
  <root>
    <level value="ALL" />
    <appender-ref ref="TraceAppender" />
    <appender-ref ref="DebugAppender" />
    <appender-ref ref="FileAppender" />
  </root>
</log4net>
```

## Example Support Configuration

In production, it's often useful to log more activity such as when troubleshooting a difficult-to-reproduce issue. This example configuration routes all logging messages at the DEBUG level or above (i.e., all logging messages) to a rolling file log. This will log a large amount of information and should not be left on after reproducing the issue for the support ticket. It increases the rolling size-per-file value to 100MB to ensure all the data is collected, but reduces the number of backup files to one single file. After enabling this configuration, detailed files can be inspected to aid in troubleshooting.

```xml
<log4net>
  <appender name="RollingFileAppender" type="log4net.Appender.RollingFileAppender">
    <threshold value="DEBUG" />
    <file value="WebApiLog.log" />
    <appendToFile value="true" />
    <maximumFileSize value="100MB" />
    <maxSizeRollBackups value="7" />
    <layout type="log4net.Layout.PatternLayout">
      <conversionPattern value="%date [%thread] %-5level %logger - MESSAGE: %message%newline %exception" />
    </layout>
  </appender>
  <root>
    <level value="ALL" />
    <appender-ref ref="RollingFileAppender" />
  </root>
</log4net>
```

