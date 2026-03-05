# API Profiles

An API Profile enables the creation of a data policy for a particular set of API Resources, generally in support of a specific usage
scenario (such as for Nutrition or Special Education specialty applications).

The policy is expressed as a set of rules for explicit inclusion or exclusion of
properties, references, collections, and/or collection items (based on Type or
Ed-Fi Descriptor values) at all levels of a Resource. The Profile can then be
assigned to API consumer applications in the [ODS / API Admin App](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=25231362) to ensure that all requests made by the consumer for Resources covered by the
Profile's data policy use the Profile-specific content types, and thus are
appropriately constrained.

|  ![Figure 1](https://edfi.atlassian.net/wiki/download/attachments/22774352/image2015-8-26%2011-40-33.png?version=1&modificationDate=1641861349347&cacheVersion=1&api=v2) |  ![Figure 2](https://edfi.atlassian.net/wiki/download/attachments/22774352/image2015-8-26%2011-42-57.png?version=1&modificationDate=1641861349340&cacheVersion=1&api=v2) |
| --- | --- |
| **Figure 1.** Depiction of the inclusion of all properties | **Figure 2.** Depiction of the inclusion of specific properties |
| ![Figure 3](https://edfi.atlassian.net/wiki/download/attachments/22774352/image2015-8-25%2016-56-57.png?version=1&modificationDate=1641861349333&cacheVersion=1&api=v2) | ![Figure 4](https://edfi.atlassian.net/wiki/download/attachments/22774352/image2015-8-26%2011-37-23.png?version=1&modificationDate=1641861349327&cacheVersion=1&api=v2) |
| **Figure 3.** Depiction of the inclusion of a specific collection | **Figure 4.** Depiction of the inclusion or exclusion of specific collection items |
| ![Figure 5](https://edfi.atlassian.net/wiki/download/attachments/22774352/image2015-8-26%2018-42-12.png?version=1&modificationDate=1641861349313&cacheVersion=1&api=v2) | |
| **Figure 5.** Depiction of the inclusion of specific properties on a child collection's items | |

## Include-Only vs. Exclude-Only Strategies

Platform implementers can choose to configure access by inclusion or exclusion,
but it's useful to understand the implications of using IncludeOnly vs.
ExcludeOnly member selection modes when defining Profiles.

If the IncludeOnly value is used exclusively, a very rigid Profile definition
will result. As new elements are added to the data model (either through an
implementer extending the data model or when upgrading to a new version of the Ed-Fi
Data Standard), none of these added data elements will be included. However, if
the Profile is defined using ExcludeOnly then these other elements will be
automatically included, resulting in a more flexible definition that will not
necessarily require adjustments over time. The implications of these two approaches is
depicted in the diagram below:

![Image](https://edfi.atlassian.net/wiki/download/attachments/22774352/image2015-8-26%2011-45-58.png?version=1&modificationDate=1641861349300&cacheVersion=1&api=v2)

Figure 6. Depiction of the implications on Profile flexibility using Inclusion vs.
Exclusion

## Profile Definition

The Profile Definition is expressed in XML in terms of the Resource model's
members (not to be confused with the JSON representation), and is used by the code
generation process in Visual Studio to create all the API artifacts necessary.
  
:::note
An XML schema is included in the Ed-Fi-ODS repository at
Ed-Fi-ODS\Application\EdFi.Ods.Common\Metadata\Schemas\Ed-Fi-ODS-API-Profiles.xsd. Additionally, a set
of sample profiles can be found at
Ed-Fi-Extensions\Extensions\EdFi.Ods.Profiles.Sample\Profiles.xml, and full set of test profile definitions can be found at
Ed-Fi-ODS\Application\EdFi.Ods.Profiles.Test\Profiles.xml. These definitions
contain many different variations of profiles applied to API resources and serve as
useful examples for developers.
:::

A Profile Definition can consist of multiple Resources (e.g., School and
Student):

```xml
<!-- Multiple resources -->
<Profile name="Test-Profile-Student-and-School-Include-All">
    <Resource name="School">
        <ReadContentType memberSelection="IncludeAll" />
        <WriteContentType memberSelection="IncludeAll" />
    </Resource>
    <Resource name="Student">
        <ReadContentType memberSelection="IncludeAll" />
        <WriteContentType memberSelection="IncludeAll" />
    </Resource>
</Profile>
```

Resources can be readable or writable only:

```xml
<!-- Readable Only Profile-->
<Profile name="Test-Profile-Resource-ReadOnly">
    <Resource name="School">
        <ReadContentType memberSelection="IncludeAll" />
    </Resource>
</Profile>

<!-- Writable Only Profile-->
<Profile name="Test-Profile-Resource-WriteOnly">
    <Resource name="School">
        <WriteContentType memberSelection="IncludeAll" />
    </Resource>
</Profile>
```

Resource members can be explicitly included based on the member selection:

```xml
<!-- Resource-level IncludeOnly -->
<Profile name="Test-Profile-Resource-IncludeOnly">
    <Resource name="School">
        <ReadContentType memberSelection="IncludeOnly">
            <Property name="NameOfInstitution" />                               <!-- Inherited property -->
            <Property name="OperationalStatusDescriptor" />                     <!-- Inherited Type property -->
            <Property name="CharterApprovalSchoolYearTypeReference" />          <!-- Property -->
            <Property name="SchoolType" />                                      <!-- Type property -->
            <Property name="AdministrativeFundingControlDescriptor" />          <!-- Descriptor property -->
            ...
        </ReadContentType>
    </Resource>
</Profile>
```

Resource members can be explicitly excluded based on the member selection:

```xml
<Profile name="Test-Profile-Resource-ExcludeOnly">
    <Resource name="School">
        <ReadContentType memberSelection="ExcludeOnly">
            <Property name="NameOfInstitution" />                               <!-- Inherited property -->
            <Property name="OperationalStatusDescriptor" />                     <!-- Inherited Type property -->
            <Property name="CharterApprovalSchoolYearTypeReference" />          <!-- Property -->
            <Property name="SchoolType" />                                      <!-- Type property -->
            <Property name="AdministrativeFundingControlDescriptor" />          <!-- Descriptor property -->
            ...
        </ReadContentType>
    </Resource>
</Profile>
```

The same inclusion/exclusion rules apply to child collections (e.g., the
School's addresses):

```xml
<!-- Child collection IncludeOnly/ExcludeOnly profiles -->
<Profile name="Test-Profile-Resource-BaseClass-Child-Collection-IncludeOnly">
    <Resource name="School">
        <ReadContentType memberSelection="IncludeOnly">
            <Collection name="EducationOrganizationAddresses" memberSelection="IncludeOnly">
                <Property name="City" />
                <Property name="StateAbbreviationDescriptor" />
                <Property name="PostalCode" />
            </Collection>
        </ReadContentType>
        <WriteContentType memberSelection="IncludeOnly">
            ...
        </WriteContentType>
    </Resource>
</Profile>
```

The data policy can contain filters on child collection items (e.g., only include Physical and Shipping addresses):

```xml
<!-- Child collection filtering on types and descriptors -->
<Profile name="Test-Profile-Resource-Child-Collection-Filtered-To-IncludeOnly-Specific-Types-and-Descriptors">
    <Resource name="School">
        <ReadContentType memberSelection="IncludeOnly">
            <Collection name="EducationOrganizationAddresses" memberSelection="IncludeOnly">
                <Property name="StreetNumberName" />
                <Property name="City" />
                <Property name="StateAbbreviationDescriptor" />
                <Filter propertyName="AddressTypeDescriptor" filterMode="IncludeOnly">
                    <Value>Physical</Value>
                    <Value>Shipping</Value>
                </Filter>
            </Collection>
        </ReadContentType>
    </Resource>
</Profile>
```

In the example above, `GET` requests will only return Physical and Shipping addresses. If also applied to
the `WriteContentType`, the caller will receive an error response if they attempt to write anything
other than Physical or Shipping addresses.

## Adding Profiles to the Ed-Fi ODS / API Solution

Refer to [How To: Add Profiles to the Ed-Fi ODS / API Solution](../../how-to-guides/how-to-add-profiles-to-the-ed-fi-ods-api-solution.md) for details.
