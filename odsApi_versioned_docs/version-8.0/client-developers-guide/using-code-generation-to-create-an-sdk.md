# Using Code Generation to Create an SDK

This section outlines how to use code generation to create an Ed-Fi API Client
SDK using a Windows environment targeting C#.

:::info

Ed-Fi API v8 metadata endpoints return documents adhering to the OpenAPI v3.0
specification. The available specification documents are listed at
`http://localhost:8080/api/metadata/specifications`; the resources specification
for a local deployment is:

`http://localhost:8080/api/metadata/specifications/resources-spec.json`

:::

## Step 1. Install Latest Version of Java

The code generation leverages Java, though it does output C# code. Thus you need
a compatible JDK v11 or higher: [Oracle
Java](https://www.oracle.com/java/technologies/downloads/),
[Adoptium](https://adoptium.net/) (open source).

## Step 2. Download the OpenApi Codegen JAR File

Download the latest version of the OpenApi Codegen JAR 7.19.0. Windows users can
use Invoke-WebRequest in PowerShell 3.0+.

```powershell
Invoke-WebRequest -OutFile openApi-codegen-cli.jar `
  https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.19.0/openapi-generator-cli-7.19.0.jar
```

For more information and download options visit
[https://github.com/OpenAPITools/openapi-generator](https://github.com/OpenAPITools/openapi-generator).

:::info

When generating an SDK using the OpenApi CodeGen resources in a
language other than C# or Java and there are profiles defined in the OpenAPI
specification file, be sure to verify that the proper contentTypes were
created during the code generation.

:::

## Step 3. Generate the SDK Source Files

The SDK source files are generated from the API's OpenAPI specification
documents via a few simple PowerShell commands. You can see the available
specification documents at `http://localhost:8080/api/metadata/specifications`.

```powershell
java -jar <openapi-generator-jar-path> generate -g csharp -i <swagger-json-url> `
  --additional-properties targetFramework=net10.0,netCoreProjectFile=true --skip-validate-spec
```

A detailed description of the switch options can be found
at [https://github.com/OpenAPITools/openapi-generator](https://github.com/OpenAPITools/openapi-generator).

To generate SDK source files, navigate to the folder containing
openApi-codegen-cli.jar and run the following commands in PowerShell 3.0+. The
Ed-Fi API publishes two specification documents — the resources specification
(which includes core and extension resources) and the descriptors specification
— so the SDK is generated from each in turn, into segregated namespaces:

### Resources (core and extensions)

```powershell
java -jar openApi-codegen-cli.jar generate -g csharp `
  -i http://localhost:8080/api/metadata/specifications/resources-spec.json `
  --api-package Api.Resources --model-package Models.Resources -o ./csharp `
  --additional-properties packageName=EdFi.OdsApi.Sdk,targetFramework=net10.0,netCoreProjectFile=true `
  --global-property modelTests=false --global-property apiTests=false --skip-validate-spec
```

### Descriptors

```powershell
java -jar openApi-codegen-cli.jar generate -g csharp `
  -i http://localhost:8080/api/metadata/specifications/descriptors-spec.json `
  --api-package Api.Descriptors --model-package Models.Descriptors -o ./csharp `
  --additional-properties packageName=EdFi.OdsApi.Sdk,targetFramework=net10.0,netCoreProjectFile=true `
  --global-property modelTests=false --global-property apiTests=false --skip-validate-spec
```

Wait for the OpenAPI CodeGen to finish generating code. A Visual Studio Solution
named **EdFi.OdsApi.Sdk.sln** will be created with the SDK artifacts.

## Step 4. Use the SDK in a Sample C# Program

1. **Open** the generated EdFi.OdsApi.Sdk.sln in Visual Studio.
2. **Download** the sample Console Application project and place it in your
   solution directory. The download link is in the note at the bottom of this
   page.
3. In the **Solution Explorer**, **right-click** on the solution and add a
   reference to the sample project that you downloaded in the previous step.
4. **Right-click** on **Edfi.OdsApi.SdkClient** > **Set as Startup Project**.
5. **Right-click EdFi.OdsApi.SdkClient Dependencies node** and click **Add
   Project Reference**.
6. In the **Add Reference** > **Projects** tab, select **EdFi.OdsApi.Sdk**, and
   then click **OK**.
7. **Right-click EdFi.OdsApi.SdkClient > Properties > Debug** > **Open debug
   launch profiles UI** and set the command line arguments. Use the template
   below, substituting your API base URL, client key, and client secret:

   ```powershell
   --url <Ed-Fi API Base URL> --key <client key> --secret <client secret>
   ```

8. Run the application and you should see the following results:

   ```none
   Fetching student records 0 through 100 of 960

   Fetching student records 100 through 200 of 960
   Fetching student records 200 through 300 of 960
   Fetching student records 300 through 400 of 960
   Fetching student records 400 through 500 of 960
   Fetching student records 500 through 600 of 960
   Fetching student records 600 through 700 of 960
   Fetching student records 700 through 800 of 960
   Fetching student records 800 through 900 of 960

   Student: 604821, Tyrone, Dodolph
   Student: 604822, Lisa, Woods
   Student: 604823, Jill, Ramirez
   Student: 604824, Tracy, Coleman
   Student: 604825, Lisa, Woods
   Student: 604826, Dale, Biennez
   Student: 604827, Orozco, Peter_of_Pratt
   Student: 604828, April, Owen
   Student: 604829, Rick, Shelton
   Student: 604830, Peter_of_Pratt
   ```

With that, you're done!

If you're working with a specific platform host, a great next step is to use
these same techniques to generate an SDK for that deployment. If the platform
host has extended the data model, your new code will automatically include those
structures in the data access components in the generated code.

:::note

[Sample Console Application
project](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v7.3/Examples/Using%20the%20ODS%20API%20SDK).

Note: the sample project targets ODS/API v7.3. Adapt the base URL
(`http://localhost:8080/api`) and the token endpoint (`http://localhost:8081/connect/token`)
for Ed-Fi API v8.

:::
