# Support Data Selection

Rather than defaulting to all data being exchanged, your Ed-Fi integration should allow the users to select which API resources should be shared as part of the data exchange. API resources should be turned off and require a clear and deliberate action by a user with the proper authority to enable them. This helps ensure that your systems's user is making an active choice to push the data and is authorized to perform that action.

Additionally, the user should be notified if the configuration will cause synchronization problems due to dependency order inherent in API resources.

The specific use case should be considered as well. For example, if a system integration will be supporting programs only at certain schools, then the API client should allow the configuration to be restricted in this same manner – to particular schools.

This promotes data security and reduces labor when tracking down problems with data quality and performance. Further, it sets up the customer for success in the configuration of the product in their implementation.

Ed-Fi's ODS/API technology also allows for the ODS/API to be extended.  To learn more about why you would do this and how, refer to [API Extensions](../../technology-providers-implementation/ed-fi-api-fundamentals/api-extensions.md)
