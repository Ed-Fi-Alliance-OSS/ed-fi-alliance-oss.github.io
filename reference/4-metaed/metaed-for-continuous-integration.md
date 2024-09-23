# MetaEd for Continuous Integration

:::tip

MetaEd can be operated directly through Node.js for continuous
integration scenarios. These instructions are intended for software
engineering tasks, and can be ignored when strictly using MetaEd from the IDE.

:::

## 1. Create a Node Project

Initialize a new Node project and install dependency `metaed-console`  from the
Ed-Fi registry, 

```
https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/npm/registry/
```

## 2\. Build Without Deploy

Run the following command from the project directory to see all command line
options:

```shell
node .\node_modules\@edfi\metaed-console\dist\index.js -h
```

This command doesn't give you much help, admittedly, so let's look at a full
example with a config file. Note that the install of `atom-metaed`  will have
loaded relevant data model files into the `node_modules`  directory, and you can
reference those projects directly as shown in this config file under
`projectPaths`.

```json
{
  "metaEdConfiguration": {
    "projects": [
      {
        "namespaceName": "EdFi",
        "projectName": "Ed-Fi",
        "projectVersion": "3.3.1-b",
        "projectExtension": "",
        "description": "The Ed-Fi Data Model 3.3b"
      },
      {
        "namespaceName": "Homograph",
        "projectName": "Homograph",
        "projectVersion": "1.0.0",
        "projectExtension": "homograph",
        "description": "The homograph extension data model"
      }
    ],
    "projectPaths": [
      ".\node_modules\\@edfi\\ed-fi-model-3.3b",
      "C:\\source\\ed-fi\\ed-fi-ods-implementation\\Extensions\\Homograph\\HomographMetaEd"
    ],
    "defaultPluginTechVersion": "5.3.0"
  }
}
```

Now, to run the build:

```shell
node .\node_modules\@edfi\metaed-console\dist\index.js -c .\your-config.json -a
```

The output log will provide details on any errors, and you can check for exit
code `1`  to fail a build process.

:::warning

The `-a`  flag is for accepting the Ed-Fi license agreement, and it
is new in MetaEd 4.0.

:::

### Build Output

The build process creates the following outputs:

1. Documentation - data dictionary, HTML handbook, Excel handbook
2. Metadata used by the ODS/API code generation
3. SQL scripts (both SQL Server and PostgreSQL)
4. XML/XSD files for bulk upload processes

### Output Directory structure

```
<artifactDirectory>
   └─ Documentation
      └─ DataDictionary
      └─ Ed-Fi-Handbook
      └─ UDM
   └─ EdFi
      └─ ApiMetadata
      └─ Database
      └─ Interchange
      └─ XSD
```

## 3\. Build and Deploy

In this scenario, you are not only building, but also deploying the output into
an extension project in the Ed-Fi-ODS-Implementation repository for use by the
ODS/API Platform build process. Thus you must have an extension project (csproj
file) in an appropriate directory. In this example, the [Homograph project
files](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Extensions/tree/main/Extensions/EdFi.Ods.Extensions.Homograph)
are saved in
`Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.Homograph` (do not
need the Artifacts directory, because those files will be replaced by this
deploy process).

Run the following command from the project directory to see all command line
options. Note that this is a different package than the one used above.

```shell
node .\node_modules\@edfi\metaed-odsapi-deploy\dist\index.js -h
```

Although this command has more switches available for operation with a config
file, we can reuse the file above with a few additions.

```json
{
  "metaEdConfiguration": {
    "artifactDirectory": "C:\\source\\ed-fi\\MetaEd-Js\\build\\MetaEdOutput",
    "deployDirectory": "c:\\source\\ed-fi",
    "projects": [
      {
        "namespaceName": "EdFi",
        "projectName": "Ed-Fi",
        "projectVersion": "3.3.1-b",
        "projectExtension": "",
        "description": "The Ed-Fi Data Model 3.3b"
      },
      {
        "namespaceName": "Homograph",
        "projectName": "Homograph",
        "projectVersion": "1.0.0",
        "projectExtension": "homograph",
        "description": "The homograph extension data model"
      }
    ],
    "projectPaths": [
      ".\node_modules\\@edfi\\ed-fi-model-3.3b",
      "C:\\source\\ed-fi\\ed-fi-ods-implementation\\Extensions\\Homograph\\HomographMetaEd"
    ],
    "defaultPluginTechVersion": "5.3.0"
  }
}
```

:::tip

The `deployDirectory`  needs to be the parent directory containing
Ed-Fi-ODS-Implementation`. You cannot clone the Implementation repository
into a directory with a different name unless you have symlinks setup for
aliasing.

:::

Alternately, you can run without a config file, with only the command line
switches. Interestingly, you don't need to specify the artifactDirectory or
projects when you take this approach.

```shell
node .\node_modules\@edfi\metaed-odsapi-deploy\dist\index.js `
	-s .\node_modules\@edfi\ed-fi-model-3.3b\ `
	-s C:\source\ed-fi\ed-fi-ods-implementation\Extensions\Homograph\HomographMetaEd\ `
	-t C:\source\ed-fi\ `
    -a
```

### Deploy Output

```shell
<deployDirectory>
   └─ Ed-Fi-ODS
      └─ Standard
         └─ Metadata
      └─ Database
         └─ Data
            └─ EdFi
         └─ Structure
            └─ EdFi
      └─ Database
         └─ Schemas
            └─ Interchange
            └─ XSD
   └─ Ed-Fi-ODS-Implementation
      └─ Application
         └─ EdFi.Ods.Standard
            └─ SupportingArtifacts
               └─ Metadata
                  └─ ApiModel.json
```
