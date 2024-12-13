# Authorization

In its _data exchange standards_ efforts (distinct from Ed-Fi's _technology development_ efforts, going back to a distinction made in section [Overview of Ed-Fi Standards and Technology](../../project-planning/overview-of-ed-fi-standards-and-technology)) Ed-Fi recommends implementing a robust authorization system based on the principle of "least privilege" and following several other guidelines.

The recommendations can be seen in the REST API Guidelines that the Alliance publishes:

* [Ed-Fi API Design & Implementation Guidelines](/reference/data-exchange/api-guidelines)

In the Ed-Fi _open source technology development_ effort, the Ed-Fi ODS / API follows these recommendations and implements a robust and configurable system for securing access to information in the API. The Ed-Fi ODS / API ships with a set of default authorization "strategies" (essentially patterns). Because there are multiple strategies, it is best to provide information customized to provider type. Accordingly, the information is presented in separate sections below.

**Pro tip:** The ODS / API system is highly configurable, and an API implementer can configure or implement other strategies. Ask the API host if such configurations have taken place before doing integration work.
