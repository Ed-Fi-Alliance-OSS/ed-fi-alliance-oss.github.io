# API Profiles

An API Profile enables the creation of a data policy for a particular set of
API Resources, generally in support of a specific usage scenario (such as for
Nutrition or Special Education specialty applications).

The policy is expressed as a set of rules for explicit inclusion or exclusion
of properties, references, collections, and/or collection items (based on Type
or Ed-Fi Descriptor values) at all levels of a Resource. Profiles are managed
through the Configuration Service API. Profile definitions are stored in the
Configuration Service database and are dynamically applied without any API
process restart.

:::info

The refresh period for dynamically defined profiles is controlled by the
`CacheSettings:ProfileCacheExpirationSeconds` setting (in seconds) in the Ed-Fi
API configuration, which defaults to 1800 seconds (30 minutes):

```json
"CacheSettings": {
    "ProfileCacheExpirationSeconds": 1800
}
```

:::

Profiles can be assigned to API consumer applications through the Configuration
Service API to ensure that all requests made by the consumer for Resources
covered by the Profile's data policy use the Profile-specific content types, and
thus are appropriately constrained.

:::info

The API evaluates each request to determine if the resource requested by the API
consumer is covered by a single _assigned_ Profile, and if so, it will
implicitly process the request using that Profile. However, if multiple Profiles
are assigned, or the API consumer is simply choosing to use a particular
Profile, the API consumer must specify which Profile is to be used by adding the
appropriate [HTTP header](../../client-developers-guide/authorization.md#api-client-profiles)
to the request (i.e. `Accept` for `GET` requests, and `Content-Type` for
`PUT`/`POST` requests).

:::

![Depiction of the inclusion of all properties](/img/reference/ods-api/incl-all-properties.png)

**Figure 1.** Depiction of the inclusion of all properties

![Depiction of the inclusion of specific properties](/img/reference/ods-api/incl-specific-properties.png)

**Figure 2.** Depiction of the inclusion of specific properties

![Depiction of the inclusion of a specific collection](/img/reference/ods-api/inclusion-of-a-specific-property.png)

**Figure 3.** Depiction of the inclusion of a specific collection

![Depiction of the inclusion or exclusion of specific collection items](/img/reference/ods-api/inc-exc-specific-collection-item.png)

**Figure 4.** Depiction of the inclusion or exclusion of specific collection items

![Depiction of the inclusion of specific properties on a child collection's items](/img/reference/ods-api/incl-props-child-collection.png)

**Figure 5.** Depiction of the inclusion of specific properties on a child collection's items

## Include-Only vs. Exclude-Only Strategies

Platform implementers can choose to configure access by inclusion or exclusion,
but it's useful to understand the implications of using IncludeOnly vs.
ExcludeOnly member selection modes when defining Profiles.

If the IncludeOnly value is used exclusively, a very rigid Profile definition
will result. As new elements are added to the data model (either through an
implementer extending the data model or when upgrading to a new version of the
Ed-Fi Data Standard), none of these added data elements will be included.
However, if the Profile is defined using ExcludeOnly then these other elements
will be automatically included, resulting in a more flexible definition that
will not necessarily require adjustments over time. The implications of these
two approaches is depicted in the diagram below:

![Depiction of the implications on Profile flexibility using Inclusion vs.
Exclusion](/img/reference/ods-api/implication-profile-flexibility.png)

**Figure 6.** Depiction of the implications on Profile flexibility using
Inclusion vs. Exclusion

## Profile Definition

The Profile Definition is expressed in XML in terms of the Resource model's
members (not to be confused with the JSON representation).

:::info

The Profile XML schema is available in the source code repository at
[API-Profile.xsd](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/src/config/datamodel/EdFi.DmsConfigurationService.DataModel/Schema/Ed-Fi-ODS-API-Profile.xsd).
This file serves as a useful reference when authoring profile definitions.

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
   <Property name="SchoolTypeDescriptor" />                            <!-- Descriptor property -->
   <Property name="AdministrativeFundingControlDescriptor" />          <!-- Descriptor property -->
   <Collection name="EducationOrganizationAddresses" memberSelection="IncludeAll"/> <!-- Inherited Collection -->
   <Collection name="SchoolCategories" memberSelection="IncludeAll" /> <!-- Collection -->
  </ReadContentType>
  <WriteContentType memberSelection="IncludeOnly">
   <Property name="ShortNameOfInstitution" />                          <!-- Inherited property -->
   <Property name="OperationalStatusDescriptor" />                     <!-- Inherited Type property -->
   <Property name="WebSite" />                                         <!-- Property -->
   <Property name="CharterStatusDescriptor" />                         <!-- Descriptor property -->
   <Property name="AdministrativeFundingControlDescriptor" />          <!-- Descriptor property -->
   <Collection name="EducationOrganizationInternationalAddresses" memberSelection="IncludeAll" /> <!-- Inherited Collection -->
   <Collection name="SchoolGradeLevels" memberSelection="IncludeAll" /> <!-- Collection -->
  </WriteContentType>
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
   <Property name="SchoolTypeDescriptor" />                            <!-- Descriptor property -->
   <Property name="AdministrativeFundingControlDescriptor" />          <!-- Descriptor property -->
   <Collection name="EducationOrganizationAddresses" memberSelection="IncludeAll" /> <!-- Inherited Collection -->
   <Collection name="SchoolCategories" memberSelection="IncludeAll" /> <!-- Collection -->
  </ReadContentType>
  <WriteContentType memberSelection="ExcludeOnly">
   <Property name="ShortNameOfInstitution" />                          <!-- Inherited property -->
   <Property name="OperationalStatusDescriptor" />                     <!-- Inherited Type property -->
   <Property name="WebSite" />                                         <!-- Property -->
   <Property name="CharterStatusDescriptor" />                         <!-- Descriptor property -->
   <Property name="AdministrativeFundingControlDescriptor" />          <!-- Descriptor property -->
   <Collection name="EducationOrganizationInternationalAddresses" memberSelection="IncludeAll" /> <!-- Inherited Collection -->
   <Collection name="SchoolGradeLevels" memberSelection="IncludeAll" /> <!-- Collection -->
  </WriteContentType>
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
   <Collection name="EducationOrganizationAddresses" memberSelection="IncludeOnly">
    <Property name="Latitude" />
    <Property name="Longitude" />
   </Collection>
  </WriteContentType>
 </Resource>
</Profile>
```

The data policy can contain filters on child collection items (e.g., only
include Physical and Shipping addresses):

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

In the example above, `GET` requests will only return Physical and Shipping
addresses. If also applied to the `WriteContentType`, the caller will receive an
error response if they attempt to write anything other than Physical or Shipping
addresses.

Resource members that are part of the identity are automatically included in the
`GET` responses and must be included in the `PUT` and `POST` request bodies.

```xml
<!-- Resource-level IncludeOnly -->
<Profile name="Test-Profile-Resource-IncludeOnly">
 <Resource name="School">
  <ReadContentType memberSelection="IncludeOnly">
   <Property name="NameOfInstitution" />                               <!-- Inherited property -->
   <Property name="OperationalStatusDescriptor" />                     <!-- Inherited Type property -->
   <Property name="CharterApprovalSchoolYearTypeReference" />          <!-- Property -->
   <Property name="SchoolTypeDescriptor" />                            <!-- Descriptor property -->
   <Property name="AdministrativeFundingControlDescriptor" />          <!-- Descriptor property -->
   <Collection name="EducationOrganizationAddresses" memberSelection="IncludeAll"/> <!-- Inherited Collection -->
   <Collection name="SchoolCategories" memberSelection="IncludeAll" /> <!-- Collection -->
  </ReadContentType>
  <WriteContentType memberSelection="IncludeOnly">
   <Property name="ShortNameOfInstitution" />                          <!-- Inherited property -->
   <Property name="OperationalStatusDescriptor" />                     <!-- Inherited Type property -->
   <Property name="WebSite" />                                         <!-- Property -->
   <Property name="CharterStatusDescriptor" />                         <!-- Descriptor property -->
   <Property name="AdministrativeFundingControlDescriptor" />          <!-- Descriptor property -->
   <Collection name="EducationOrganizationInternationalAddresses" memberSelection="IncludeAll" /> <!-- Inherited Collection -->
   <Collection name="SchoolGradeLevels" memberSelection="IncludeAll" /> <!-- Collection -->
  </WriteContentType>
 </Resource>
</Profile>
```

In the example above, the API includes schoolId in `GET` responses, and the API
client must include it in `POST` and `PUT` requests even though it wasn't
explicitly included in the definition. Additionally, if required fields are
excluded, the profile cannot be used to _create_ the resource (though updates
would still be possible).

## Adding Profiles to the Ed-Fi API

Profiles are created and managed through the Configuration Service API. Submit
the XML definition as the `definition` field when creating or updating a profile
record. Once created, a profile can be assigned to one or more applications via
the Configuration Service API.
