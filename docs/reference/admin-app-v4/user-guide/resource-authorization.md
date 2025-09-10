---
draft: true
---

# Ed-Fi Resource Authorization and Admin App

The Ed-Fi Admin App streamlines the process of generating API keys and secrets crucial for seamlessly integrating applications with your organization's Ed-Fi data. These credentials play a pivotal role in ensuring secure data transactions between integrated applications, safeguarding your organization's information flow. It's vital for Admin App users to understand the components that make up an application within the Ed-Fi framework. This guide aims to provide a comprehensive understanding of the application components in Ed-Fi, ensuring users are well-informed when setting up and managing applications in the Admin App.

:::info
[See the documentation here describing the different security concepts in Ed-Fi.](https://techdocs.ed-fi.org/display/ODSAPIS3V71/Security+Configuration+Data+Stores)
:::

**ODS:** Operational Data Store. A database that holds operational data for the current school year in Ed-Fi. The data is stored in accordance to Ed-Fi Data Standards.

**Tenant:** A virtual environment that allows for the ability to locally control claimsets, vendors, and applications without impacting other tenants hosted in the same Ed-Fi environment. 

**Resource:** Each of the endpoints in the Ed-Fi data API represents a resource. These resources are used by API clients to access domain specific data. These are what API clients interact with to retrieve, update, or manage data.

**Vendor:** A named entity that owns multiple applications within the system. They are the main link between applications and namespace prefixes. For example, a vendor in Ed-Fi could be the name of an assessment vendor (e.g. iReady or ACT), or a SIS vendor (e.g. PowerSchool). To learn more about creating vendors in the Admin App [**please click here.**](../vendors-and-claimsets/)

**Namespace Prefix:** Employed to signify data ownership for distinct partitions within the Ed-Fi data model. This holds particular significance in domains employing Namespace Based Authorization, such as descriptors or assessments.

**Application:** A named entity that makes an association between resource authorizations and API clients. This association is crucial for managing and tracking who has access to various data within the system. All applications belong to a vendor.

:::tip Example
A district admin wanting to create a set of API credentials for their SIS integration would create an *application* using the Admin App. The admin would provide a name for the application, and select the vendor, the claimset and education organizations they'd like the integrating SIS to be bound to. Saving this information in the Admin App will generate a set of API credentials that can then be shared or input into the integrating system.
:::

**Claimset:** A collection of rules that define which resources can be accessed, what actions can be performed on them, and the authorization strategies that apply. It serves as a blueprint for access control, outlining the specific permissions for a given use case. For additional comprehensive documentation around claimsets and Resources in Ed-Fi, please read the technical documentation [**located here.**](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V71/pages/25493663/API+Claim+Sets+Resources)

**Authorization Strategy:** A method through which the Ed-Fi system determines whether an application should be allowed to carry out a specific action on a resource, such as reading student data or updating teacher information. At this time, authorization strategies are not user defined, but rather pre-defined by Ed-Fi. [**More details here.**](#authorization-strategies)

**Action:** The types of operations that can be performed on a resource, aligning with the CRUD acronym: Create, Read, Update, and Delete (in Ed-Fi there is also a ReadChanges action). Each action represents a different way in which resources can be accessed or manipulated. [**Read more about actions in Ed-Fi here.**](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V71/pages/25493663/API+Claim+Sets+Resources#:~:text=API%20Admin%20database.-,Actions,-The%20Ed%2DFi) Scroll down to the section called **Actions.**

**Profiles:** Complement the function of claimsets by controlling access at a more granular level, specifically at the columnar or sub-collection level within resources. While claimsets determine who has access to which resources and what actions they can perform, profiles define access to specific parts of the data within those resources. [**Please read technical documentation about profiles in Ed-Fi here.**](https://techdocs.ed-fi.org/display/ODSAPIS3V71/API+Profiles)

:::info
This graphic is pulled straight from the Ed-Fi Tech docs but is useful to visualize how profiles work in Ed-Fi.

![Ed-Fi Profiles Visual](https://docs.startingblocks.org/imgs/edfi_profiles_visual.PNG)
:::

## Claimsets in the Admin App

Currently in the Admin App, you can export, import, and view claimset definitions within the user interface (UI). Future releases of the Admin App will include a claimset editor.

To view claimset definitions in the Admin App, navigate to the claimset page in your chosen environment.

![Claimset Viewer](https://docs.startingblocks.org/imgs/claimset_viewer.gif)

## Authorization Strategies

Admin App users who create claimsets and provision API credentials must be aware of the different authorization methods in Ed-Fi standards. Authorization strategies represent *how* an API client can access certain resources within Ed-Fi.

**The current list of authorization strategies used in Ed-Fi as of API Suite 3 v 7.1**

* No Further Authorization Required
* Relationships with Education Organizations and People
* Relationships with Education Organizations only
* Namespace Based
* Relationships with People only
* Relationships with Students only
* Relationships with Students only (through - StudentEducationOrganizationResponsibilityAssociation)
* Ownership Based
* Relationships with Education Organizations and People (including deletes)
* Relationships with Education Organizations only (Inverted)
* Relationships with Education Organizations and People (Inverted)
* Relationships with Students only (through - StudentEducationOrganizationResponsibilityAssociation, including deletes)

For more information about how authorization works in Ed-Fi [**please read the docs here.**](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V71/pages/25493663/API+Claim+Sets+Resources#:~:text=strategy%20described%20below.-,Authorization%20Strategies,-The%20implementation%20of) There is a section at the bottom of the page specifically about authorization strategies.
