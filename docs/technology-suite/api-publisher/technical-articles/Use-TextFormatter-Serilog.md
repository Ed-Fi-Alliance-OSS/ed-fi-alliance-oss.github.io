# How to use the TextFormatter class

API Publisher uses by default the following output template in the _logging.json_ configuration:
```
[{Timestamp:yyyy-MM-dd HH:mm:ss,fff}] [{Level:u4}] [{ThreadId:00}] {SourceContext} - {Message} {Exception} {NewLine}
```

This template uses the format provided by the **Serilog** library, you can find more details on how to create your specific format:
[Formatting Output](https://github.com/serilog/serilog/wiki/Formatting-Output)

The sinks available in API Publisher are Console, File, and Aws CloudWatch. Some of these sinks have compatibility with the default output template, but in some cases that doesn't work, for example the Aws CloudWatch sink. If you run into this problem, we provide our TextFormatter which is similar to the default. Here we are going to see how to use it:

## How to use it in the AWSCloudWatch:

In the _logging.json_ file

- Using the default format
```
"WriteTo:AWSCloudWatch": {
  "Name": "AmazonCloudWatch",
  "Args": {
    "logGroup": "Ed-Fi-Publisher",
    "logStreamPrefix": "Ed-Fi-Tools",
    "restrictedToMinimumLevel": "Verbose",
    "textFormatter": "EdFi.Tools.ApiPublisher.Core.Configuration.Serilog.TextFormatter, EdFi.Tools.ApiPublisher.Core"
  }
}
```

> [!NOTE]
> The default template format provided by the TextFormatter is: ```[{Timestamp:yyyy-MM-dd HH:mm:ss,fff}] [{Level}] [{ThreadId:00}] [{SourceContext}] - {Message} {Exception} {NewLine}```



- Using a custom format
```
"WriteTo:AWSCloudWatch": {
  "Name": "AmazonCloudWatch",
  "Args": {
    "logGroup": "Ed-Fi-Publisher",
    "logStreamPrefix": "Ed-Fi-Tools",
    "restrictedToMinimumLevel": "Verbose",
    "textFormatter": {
      "type": "EdFi.Tools.ApiPublisher.Core.Configuration.Serilog.TextFormatter, EdFi.Tools.ApiPublisher.Core",
      "format": "[{Timestamp:MM-dd HH:mm:ss}] {Level} - {Message} {Exception} {NewLine}" 
    }
  }
}
```

## Values accepted in the template format:

1. You should defined each one between braces, eg. ```{Level}```. 
2. Some of them can be formatted using the .NET framework, eg. ```{Timestamp:dd-MM-yy}```  
3. The following values are accepted by the implementation.

   - **Timestamp:** Date and time of the event. It can be formatted using the [Custom date and time format string]( https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings) provided by .NET.
   - **Level:** Level of the event. The values will be display as follows and cannot be formatted 
        - Verbose => "ALL"
        - Debug => "DEBUG"
        - Information => "INFO"
        - Warning => "WARN"
        - Error => "ERROR"
        - Fatal => "FATAL"
   - **ThreadId:** Thread where the event was triggered. Is an Integer and can be formatted using [Custom numeric format strings](https://learn.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings) provided by .NET 
   - **SourceContext:** Class name where the event was triggered. 
   - **Message:** Message of the event.
   - **Exception:** Contains the message and stacktrace of the event. Cannot be formatted.
   - **NewLine:** A property with the value of System.Environment.NewLine.

## More examples
You can also use this format in other sinks:

1. Console
```
"WriteTo:Console": {
  "Name": "Console",
  "Args": {
    "formatter": {
      "type": "EdFi.Tools.ApiPublisher.Core.Configuration.Serilog.TextFormatter, EdFi.Tools.ApiPublisher.Core",
      "format": "[{Level}] - {Message} {Exception} {NewLine}"
    }
  }
}
```

2. File
```
"WriteTo:File": {
  "Name": "File",
  "Args": {
    "formatter": {
      "type": "EdFi.Tools.ApiPublisher.Core.Configuration.Serilog.TextFormatter, EdFi.Tools.ApiPublisher.Core",
      "format": "[{Level}] - {Message} {Exception} {NewLine}"
    },
    "path": "C:\\ProgramData\\Ed-Fi-API-Publisher\\Ed-Fi-API-PublisherSerilog.log"
  }
}
```







