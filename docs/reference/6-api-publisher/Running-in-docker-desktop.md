# Running in Docker Desktop

## Setup

### Step 1. Download the Source Code or Clone the Repo

The Ed-Fi ODS Docker deployment source code is in the Ed-Fi repository hosted by
GitHub. A link to the repository is provided in the download panel on the right.
You can clone the repository or download the source code as a ZIP file.

[Source code repository](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Publisher)

### Step 2. Setup Your Environment Variables

Configure your deployments using an environment file. The repository includes a
`.env.example` listing the supported environment variables.

> Path: `/src/Compose/env.example`

![Docker path example](img/docker/docker-path.png)

Copy `env.example` file and name it `.env`. Update the values as desired, and
replace every `<...>` placeholder: a value left as a placeholder is written to
the configuration as is.

```env
# The section option for apiPublisherSettings file
BEARER_TOKEN_REFRESH_MINUTES=<Default. 28>
RETRY_STARTING_DELAY_MILLISECONDS=<Default. 100>
MAX_RETRY_ATTEMPTS=<Default. 10>
MAX_DEGREE_OF_PARALLELISM_FOR_RESOURCE_PROCESSING=<Default. 10>
MAX_DEGREE_OF_PARALLELISM_FOR_POST_RESOURCE_ITEM=<Default. 20>
MAX_DEGREE_OF_PARALLELISM_FOR_STREAM_RESOURCE_PAGES=<Default. 5>
STREAMING_PAGES_WAIT_DURATION_SECONDS=<Default. 10>
STREAMING_PAGE_SIZE=<Default. 75>
INCLUDE_DESCRIPTORS=<Default. false>
ERROR_PUBLISHING_BATCH_SIZE=<Default. 25>
USE_CHANGE_VERSION_PAGING=<Default. false>
CHANGE_VERSION_PAGING_WINDOW_SIZE=<Default. 25000>

# The file configurationStoreSettings
PROVIDER=<Could be one of the following values: sqlServer, postgreSql, awsParameterStore, or plainText (default)>
SQLSERVER_SERVER=<If PROVIDER is sqlServer this is required Eg. (local)>
SQLSERVER_DATABASE=<If PROVIDER is sqlServer this is required Eg. EdFi_API_Publisher_Configuration>
POSTGRESQL_HOST=<If PROVIDER is postgreSql this is required Eg. localhost>
POSTGRESQL_DATABASE=<If PROVIDER is postgreSql this is required Eg. edfi_api_publisher_configuration>
AWS_PROFILE=<If PROVIDER is awsParameterStore this is required Eg. default>
AWS_REGION=<If PROVIDER is awsParameterStore this is required Eg. us-east-1>

# PlainText connections
SOURCE_NAME=<Name for the source connection Eg. District_Source>
SOURCE_URL=<Url for the source connection Eg. https://district.example.org/api/>
SOURCE_KEY=<Key for the source connection Eg. sourceKey>
SOURCE_SECRET=<Secret for the source connection Eg. sourceSecret>

TARGET_NAME=<Name for the target connection Eg. State_Target>
TARGET_URL=<Url for the target connection Eg. https://state.example.org/api/>
TARGET_KEY=<Key for the target connection Eg. targetKey>
TARGET_SECRET=<Secret for the target connection Eg. targetSecret>

# Logging using Serilog
WRITE_TO_FILE_PATH=<Path to store the logging file Eg. ../tmp/logs/Ed-Fi-API-PublisherSerilog.log>
```

Sample `.env` provide all the different parameters for run ApiPublisher with
different configurations. Please provide the information necessary for a
specific configuration.

### 2a. API Publisher Version

The image installs the API Publisher package set by `ARG VERSION` in
`src/Dockerfile`. To install another version, change that value before you build
the image. The available versions are listed in the
[EdFi.ApiPublisher feed](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.ApiPublisher).

### 2b. Section ApiPublisherSettings file

If you like, you can change the default parameters or leave them as is.

[API Publisher Configuration](API-Publisher-Configuration.md)

### 2c. Section ConfigurationStoreSettings and Plain Text Connections

These two sections can be configured using
[API Connection Management](API-Connection-Management.md)

### Step 3. Run Docker Compose

In this step you need to run a command in any shell terminal that support Docker
commands (i.e. PowerShell in Windows)

Go to the root of the project and run this command:

```powershell
docker compose -f src/Compose/compose-build.yml --env-file src/Compose/.env up -d
```

## Step 4. Verify Your Deployments

![Docker Validation](img/docker/docker-validation.png)

You can also check these files to see if all the settings in the .env file are
used in the API Publisher configuration.

![Docker files modified](img/docker/docker-files-modified.png)

## Step 5. Run API Publisher

We have two ways to run API Publisher inside or outside the created container.

Inside the container, `localhost` is the container itself. To reach an API that
runs on the same machine as Docker, use `host.docker.internal` as the host name,
for example `https://host.docker.internal/WebApi/`.

### Outside Container

```powershell
docker exec -it ed-fi-ods-apipublisher dotnet EdFiApiPublisher.dll `
  --sourceUrl={{SourceUrl}} `
  --sourceKey={{SourceKey}} `
  --sourceSecret={{SourceSecret}} `
  --targetUrl={{TargetUrl}} `
  --targetKey={{TargetKey}} `
  --targetSecret={{TargetSecret}} `
  {{Additional Parameters}}
```

### Inside Container

Using Docker Dashboard it is possible to enter the container and use its
terminal. Once inside it is necessary to run the command without the docker
parameter... i.e.

![Docker Terminal](img/docker/docker-terminal.png)

```sh
dotnet EdFiApiPublisher.dll --sourceUrl={{SourceUrl}} \
  --sourceKey={{SourceKey}} \
  --sourceSecret={{SourceSecret}} \
  --targetUrl={{TargetUrl}} \
  --targetKey={{TargetKey}} \
  --targetSecret={{TargetSecret}} \
  {{Additional Parameters}}
```

## Additional Configurations

### AWS Parameter Store

#### A. Configuration

It is necessary to have the store parameters created on AWS
[Configuration Aws Parameter Store](ConfigurationStore/Aws-Parameter-Store.md)

Export AWS credentials to consume AWS parameters store inside the container

```sh
export AWS_ACCESS_KEY_ID="<access key id>"
export AWS_SECRET_ACCESS_KEY="<secret access key>"
export AWS_SESSION_TOKEN="<session token>"
```

#### B. Execution

Having all this configured it is possible to run ApiPublisher with the
AWSParameterStore parameter

```sh
dotnet EdFiApiPublisher.dll --configurationStoreProvider=awsParameterStore \
  --sourceName=Ed-Fi-ApiPub01 \
  --targetName=Ed-Fi-ApiPub02 \
  --ignoreIsolation=true \
  --maxRetryAttempts=4 \
  --retryStartingDelayMilliseconds=1000 \
  --streamingPageSize=1000 \
  --maxDegreeOfParallelismForResourceProcessing=1 \
  --includeOnly=grades,students
```

![Docker command runs](img/docker/run-docker-command.png)

#### C. Validate Results

After completing the execution the 'lastChangeVersion Processed' parameter value
should be updated

![ChangeVersion updated](img/docker/changeVersion-updated.png)

## CloudWatch

### Configuration

Configure the AWS log storage parameters in the configuration file.
[Configuration CloudWatch](CloudWatch-configuration.md)

### Execution

Run any ApiPublisher command to start storing the execution results.

```sh
dotnet EdFiApiPublisher.dll --configurationStoreProvider=awsParameterStore \
  --sourceName=Ed-Fi-ApiPub01 \
  --targetName=Ed-Fi-ApiPub02 \
  --ignoreIsolation=true \
  --maxRetryAttempts=4 \
  --retryStartingDelayMilliseconds=1000 \
  --streamingPageSize=1000 \
  --maxDegreeOfParallelismForResourceProcessing=1 \
  --includeOnly=grades,students
```

To review the results we have to go to the 'logGroup' and then look for the last
logStream created.

![Cloudwatch DataStream](img/docker/cloudwatch-datastream.png)
