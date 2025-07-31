# Quick Start Calling Admin API 2.x using Python

## Overview

This is a quick start guide for calling Admin API using Python scripting, it
will cover the basic operations of the Admin API:  

## Configure Environment with Python and Admin API 2.2

Once [Admin API](../readme.md) is installed, we can use Python versions above
3.7+. It is necessary to have the
[requests](https://requests.readthedocs.io/en/latest/user/quickstart/) library
installed or similar. We can use the following command to review our current
python version.

```shell
python --version
```

The utility to install packages in Python is called pip, in case you don't have
it installed you can follow the instructions in this
[pip installation guide](https://pip.pypa.io/en/stable/installation/).

To install the libraries using pip, you can use the line below.

```shell
pip install -U requests
```

To import it into our script we will use the following imports:

```python title=script.py
import requests
import warnings

warnings.filterwarnings('ignore') # setting ignore as a parameter
```

### Information

#### GET /

```python
def information(base_url: str) -> dict:
    '''
        Retrieve API informational data
    '''
    endpoint = "/"
    url = f"{base_url}{endpoint}"

    r = requests.get(url, verify=False)

    return r.json()
```

Our output should bring the information from the Restful API.

#### Sample Output for Information

```json
{
  "version": "1.1",
  "build": "1.0.0.0"
}
```

### Authenticate to Admin API

In a new installation, it is necessary to previously register the client to
connect, for which we will follow the instructions within the document in
[Securing Admin API](../../securing-admin-api.md).

### Register a new client

In order to do so, we can add the functionality to our script by adding the
following lines.

#### POST /connect/register

```python
def register(
    base_url: str,
    client_payload: str,
) -> dict:
    '''
        Registers a new client

        Parameters
        ----------
        'base_url': base_url,
            URL where API is hosted
        client_payload: dict
            The client information
            {
                'client_id': str,
                    The client id for the client
                'client_secret': str,
                    The client secret for the client
                display_name: str
                    Display name for client
            }
    '''
    endpoint = "/connect/register"
    url = f"{base_url}{endpoint}"

    r = requests.post(
        url,
        data={
            "ClientId": client_payload["client_id"],
            "ClientSecret": client_payload["client_secret"],
            "DisplayName": client_payload["display_name"],
            },
        verify=False
        )

    return r.json()
```

And we can construct our payload as the following example.

#### Sample Input for Register a New Client

```json
new_client = {
        'client_id': <your_client_id>,
        'client_secret': <your_secret>,
        'display_name': "Wille",
    }
```

The successful output will be JSON formatted.

#### Sample Output for Register a New Client

```json
{
  "title": "Registered client 1 successfully.",
  "status": 200
}


```

### Token

Once we register our client according to the parameters specified in the
document [Securing Admin API](../../securing-admin-api.md).

We can obtain the token we will use for each API query. Just pass the same
ClientID and ClientSecret we use to register it, with two new variables.

#### Sample Input for Token

```json
client_id = <your_client_id>
client_secret = <your_secret>
grant_type = "client_credentials"
scope = "edfi_admin_api/full_access"
```

#### POST /connect/token

```python
def token(
    base_url: str,
    client_id: str,
    client_secret: str,
    grant_type: str,
    scope: str,
) -> dict:
    '''
        Retrieves a bearer token

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        client_id: str
            The client id provided in the register
        client_secret: str
            The client secret provided in the register
        grant_type: str
            default "client_credentials"
        scope: str
            default "edfi_admin_api/full_access"
    '''
    endpoint = "/connect/token"
    url = f"{base_url}{endpoint}"

    r = requests.post(
        url,
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": grant_type,
            "scope": scope,
            },
        verify=False,
        )

    return r.json()
```

The outcome will be JSON formatted.

#### Sample Output for Token

```json
{
  "access_token": <your_token>,
  "token_type": "Bearer",
  "expires_in": 3599
}
```

Then you can use the token as an authentication method, with the header
Authorization as the example below.

## Vendors

### Retrieve a Listing of Vendors

See the [Endpoints - Admin
API](https://edfi.atlassian.net/wiki/spaces/ADMINAPI/pages/21300937/Endpoints+in+Admin+API+2.x)
page for a complete list of resources and parameters. For this example, we will
get a list of providers.  

#### GET /v2/vendors

```python
def get_vendors(
    base_url: str,
    access_token: str,
) -> dict:
    '''
        Retrieves all vendors

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer

        Returns
        -------
        r: List[Dict[str, str]]
            Returns a list of dictionaries from the request
            converted from JSON format.
            [
                {
                    "vendorId": 0,
                    "company": "string",
                    "namespacePrefixes": "string",
                    "contactName": "string",
                    "contactEmailAddress": "string",
                }
            ]
    '''
    endpoint = "/v2/vendors?offset=0&limit=25"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

We will get a list of the vendors, JSON formatted, as in the example below.

#### Sample Output for Retrieve a Listing of Vendors

```json
[
  {
    "id": 1,
    "company": "ACME Education",
    "namespacePrefixes": "ACME",
    "contactName": "Wile E. Coyote",
    "contactEmailAddress": "wile@acme.edu"
  }
]


```

### Create a Vendor

To create a new vendor, we will use the POST verb. Although in this example, it
is necessary to pass a dictionary with the required data. Again, you can refer
to the link [Endpoints - Admin
API](https://edfi.atlassian.net/wiki/spaces/ADMINAPI/pages/21300937/Endpoints+in+Admin+API+2.x)
to successfully create the provider. In our case, we will use the following
information.

#### Sample Input for Create a Vendor

```json
vendor_payload = {
        "company": "ACME Education",
        "namespacePrefixes": "ACME",
        "contactName": "Wile E. Coyote",
        "contactEmailAddress": "wile@acme.edu",
        }
```

Which we will pass as a parameter to a function as shown below, or with the
method of your choice.

#### POST /v2/vendors

```python
def create_vendor(
    base_url: str,
    access_token: str,
    payload: dict,
) -> dict:
    '''
        Creates a vendor based on supplied values

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "company": "string",
                "namespacePrefixes": "string",
                "contactName": "string",
                "contactEmailAddress": "string",
            }
    '''
    endpoint = "/v2/vendors"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.post(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 201 Status Code

### Get a vendor

In the case that you want to retrieve information from one of the vendors, you
will need to use the resource ID.

#### GET /v2/vendors/`{id}`

```python
def get_vendor(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing vendor using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/vendors"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

In case of success we will obtain an output as follow:

#### Sample Output for Get a Vendor

```json
{
  "Id": 9,
  "company": "ACME Education",
  "namespacePrefixes": "ACME",
  "contactName": "Road Runner",
  "contactEmailAddress": "roadrunner@acme.edu"
}
```

### Update a vendor

For this example, we update the previously created vendor with the following
info.

#### Sample Input for Update a Vendor

```json
vendor_payload = {
        "company": "ACME Education",
        "namespacePrefixes": "ACME",
        "contactName": "Yosemite Sam",
        "contactEmailAddress": "yosemitesam@acme.edu",
        }
```

We use as an example the code below.

#### PUT /v2/vendors/`{id}`

```python
def edit_vendor(
    base_url: str,
    access_token: str,
    vendor_payload: dict,
    id: int
) -> dict:
    '''
        Updates vendor based on the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        vendor_payload: dict
            {
                "company": "string",
                "namespacePrefixes": "string",
                "contactName": "string",
                "contactEmailAddress": "string",
            }
        id: int
            Resource identifier
    '''
    endpoint = "/v2/vendors"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.put(
        url=url,
        headers=headers,
        json=vendor_payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 200 Status Code

### Delete a vendor

To delete a vendor you can use the next point, as the example provided below.

#### DELETE /v2/vendors/`{id}`

```python
def delete_vendor(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Deletes an existing vendor using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/vendors"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.delete(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

The output will be a confirmation as follows:

#### Sample Output for Delete a Vendor

```json
{
  "title": "Vendor deleted successfully"
}
```

## Claim sets

### List all Claims

To retrieve all the claims we will use the GET verb as follows:

#### GET /v2/claimsets

```python
def get_claimsets(
    base_url: str,
    access_token: str,
) -> dict:
    '''
        Retrieves all claimsets

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer

        Returns
        -------
        r: List[Dict[str, str]]
            Returns a list of dictionaries from the request
            converted from JSON format.
            [
                {
        "id": 0,
        "name": "string",
        "_isSystemReserved": false,
        "_applications": [
           {
             "applicationName": "string"
         }
        ]
    }
            ]
    '''
    endpoint = "/v2/claimsets?offset=0&limit=25"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

The result will be a list of claim sets as the ones shown below:

#### Sample Output for List all Claims

```json
[
  {
    "id": 1,
    "name": "AB Connect",
    "_isSystemReserved": true,
    "_applications": []
  },
  ...
]

```

### Create a Claim

For the creation of a claim, we will use the POST verb again, and we will pass a
dictionary with the values to store, an example of payload for this case could
be like the following.

#### Sample Input for Create a Claim

```json
claimset_payload = {
        "name": "Acme Learning User"
 }
```

Which we will pass as a parameter in a function like the following:

#### POST /v2/claimsets

```python
def create_claimset(
    base_url: str,
    access_token: str,
    payload: dict,
) -> dict:
    '''
        Creates a claimset based on supplied values

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "name": "string"
            }
    '''
    endpoint = "/v2/claimsets"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.post(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 201 Status Code

### Retrieve a claim set

To retrieve the claim information, we will use the Claims ID, the example would
be as follows.

#### GET /v2/claimsets/`{id}`

```python
def get_claimset(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing claimset using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/claimsets"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

In case of success we will obtain an output as follow:

#### Sample Output for Retrieve a Claim Set

```json
{
  "resourceClaims": [
 {
      "id": 9,
      "name": "educationStandards",
      "actions": [
        {
          "name": "Read",
          "enabled": true
        },
        {
          "name": "Create",
          "enabled": true
        }
      ],
      "_defaultAuthorizationStrategiesForCRUD": [
        {
          "actionId": 1,
          "actionName": "Create",
          "authorizationStrategies": [
            {
              "authStrategyId": 4,
              "authStrategyName": "NamespaceBased",
              "isInheritedFromParent": false
            }
          ]
        },
        {
          "actionId": 2,
          "actionName": "Read",
          "authorizationStrategies": [
            {
              "authStrategyId": 1,
              "authStrategyName": "NoFurtherAuthorizationRequired",
              "isInheritedFromParent": false
            }
          ]
        },
        {
          "actionId": 3,
          "actionName": "Update",
          "authorizationStrategies": [
            {
              "authStrategyId": 4,
              "authStrategyName": "NamespaceBased",
              "isInheritedFromParent": false
            }
          ]
        },
        {
          "actionId": 4,
          "actionName": "Delete",
          "authorizationStrategies": [
            {
              "authStrategyId": 4,
              "authStrategyName": "NamespaceBased",
              "isInheritedFromParent": false
            }
          ]
        },
        {
          "actionId": 5,
          "actionName": "ReadChanges",
          "authorizationStrategies": [
            {
              "authStrategyId": 1,
              "authStrategyName": "NoFurtherAuthorizationRequired",
              "isInheritedFromParent": false
            }
          ]
        }
      ],
      "authorizationStrategyOverridesForCRUD": [],
      "children": []
    }
],
  "id": 1,
  "name": "Acme Learning User",
  "_isSystemReserved": false,
  "_applications": [
  {
   "applicationName": "Acme Learning"
  }
 ]
}
```

### Update a claim set

In case you want to update some info from the previous claim set. For this
example, we will use the next input.

#### Sample Input for Update a Claim Set

```json
claimset_payload = {
         "name": "Updated-ClaimSet"
        }
```

And the code to update goes as follows.

#### PUT /v2/claimsets/`{id}`

```python
def edit_claimset(
    base_url: str,
    access_token: str,
    payload: dict,
    id: int,
) -> dict:
    '''
        Updates a claimset based on resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "name": "string"
            }
    '''
    endpoint = "/v2/claimsets"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.put(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 200 Status Code

### Delete a claim set

To delete a claim set you can use the example below.

#### DELETE /v2/claimset/`{id}`

```python
def delete_claimset(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Deletes an existing claimset using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/claimsets"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.delete(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

The confirmation message.

#### Sample Output for Delete a Claim Set

```json
{
  "title": "ClaimSet deleted successfully"
}
```

### Import a Claim set

For importing a claim, we will use the POST verb again. An example of payload
for this case could be like the following.

#### Sample Input for Import a Claim Set

```python
claimset_import_payload = {
  "name": "Acme Learning User Imported",
  "resourceClaims": [
    {
      "name": "educationStandards",
      "actions": [
        {
          "name": "read",
          "enabled": True
        },
        {
          "name": "create",
          "enabled": True
        }
      ]
    }
  ]
}
```

And the code to import goes as follows.

#### POST /v2/claimset/`{id}`

```python
def import_claimset(
    base_url: str,
    access_token: str,
    payload: dict,
) -> dict:
    '''
        Imports a claimset based on supplied values

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "name": "string",
                "resourceClaims": [
                    {
                        "name": "string",
                        "actions": [
                            {
                            "name": "string",
                            "enabled": true
                            }
                        ],
                        "authorizationStrategyOverridesForCRUD": [
                            {
                            "actionId": 0,
                            "actionName": "string",
                            "authorizationStrategies": [
                                {
                                "authStrategyId": 0,
                                "authStrategyName": "string",
                                "isInheritedFromParent": true
                                }
                            ]
                            }
                        ],
                        "children": [
                            "string"
                        ]
                    }
                ]
            }
    '''
    endpoint = "/v2/claimsets/import"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.post(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

### Export a Claim set

For exporting a claim, we will use the GET verb. An example of payload for this
case could be like the following.

#### GET /v2/claimsets/`{id}`/export

```python
def export_claimset(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Exports an existing claimset using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/claimsets"
    url = f"{base_url}{endpoint}/`{id}`/export"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

In case of success we will obtain an output as follow:

#### Sample Output for Export a Claim Set

```json
{
  "resourceClaims": [
 {
      "id": 9,
      "name": "educationStandards",
      "actions": [
        {
          "name": "Read",
          "enabled": true
        },
        {
          "name": "Create",
          "enabled": true
        }
      ],
      "_defaultAuthorizationStrategiesForCRUD": [
        {
          "actionId": 1,
          "actionName": "Create",
          "authorizationStrategies": [
            {
              "authStrategyId": 4,
              "authStrategyName": "NamespaceBased",
              "isInheritedFromParent": false
            }
          ]
        },
        {
          "actionId": 2,
          "actionName": "Read",
          "authorizationStrategies": [
            {
              "authStrategyId": 1,
              "authStrategyName": "NoFurtherAuthorizationRequired",
              "isInheritedFromParent": false
            }
          ]
        },
        {
          "actionId": 3,
          "actionName": "Update",
          "authorizationStrategies": [
            {
              "authStrategyId": 4,
              "authStrategyName": "NamespaceBased",
              "isInheritedFromParent": false
            }
          ]
        },
        {
          "actionId": 4,
          "actionName": "Delete",
          "authorizationStrategies": [
            {
              "authStrategyId": 4,
              "authStrategyName": "NamespaceBased",
              "isInheritedFromParent": false
            }
          ]
        },
        {
          "actionId": 5,
          "actionName": "ReadChanges",
          "authorizationStrategies": [
            {
              "authStrategyId": 1,
              "authStrategyName": "NoFurtherAuthorizationRequired",
              "isInheritedFromParent": false
            }
          ]
        }
      ],
      "authorizationStrategyOverridesForCRUD": [],
      "children": []
    }
],
  "id": 1,
  "name": "Acme Learning User",
  "_isSystemReserved": false,
  "_applications": [
  {
   "applicationName": "Acme Learning"
  }
 ]
}
```

## ODS Instances

### Retrieve a Listing of ODS instances

See the [Endpoints - Admin
API](https://edfi.atlassian.net/wiki/spaces/ADMINAPI/pages/21300937/Endpoints+in+Admin+API+2.x)
page for a complete list of resources and parameters. For this example, we will
get a list of providers.  

#### GET /v2/odsInstances

```python
def get_ods_instance(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing ods instance using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/odsInstances"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

We will get a list of the ods instances, JSON formatted, as in the example
below.

#### Sample Output for Retrieve a Listing of ODS Instances

```json
[
  {
    'id': 1,
    'name': 'Ods Instance 1',
    'instanceType': 'ODS'
  }
]

```

### Create an ODS Instances

To create a new ods instance, we will use the POST verb.

#### Sample Input for Create an ODS Instance

```json
odsinstance_payload = {
 "name": "Ods Instance 1",
    "instanceType": "ODS",
    "connectionString": "valid connection string"
}
```

Which we will pass as a parameter to a function as shown below, or with the
method of your choice.

#### POST /v2/odsInstances

```python
def create_ods_instance(
    base_url: str,
    access_token: str,
    payload: dict,
) -> dict:
    '''
        Creates an ODS instance based on supplied values

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
             {
                "name": "string",
                "instanceType": "string",
                "connectionString": "string"
              }
    '''
    endpoint = "/v2/odsInstances"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.post(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 201 Status Code

### Get an ODS Instance

In the case that you want to retrieve information from one of the ods instances,
you will need to use the resource ID.

#### GET /v2/odsInstances/`{id}`

```python
def get_ods_instance(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing ods instance using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/odsInstances"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

In case of success we will obtain an output as follow:

#### Sample Output for Get an ODS Instance

```json
{
  'odsInstanceContexts': [

  ],
  'odsInstanceDerivatives': [

  ],
  'id': 1,
  'name': 'Ods Instance 1',
  'instanceType': 'ODS'
}
```

### Get ODS Instance Applications

In the case that you want to retrieve information from one of the ODS instance
applications, you will need to use the resource ID.

#### GET /v2/odsInstances/`{id}`/applications

```python
def get_ods_instance_applications(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing ods instance applications using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/odsInstances"
    url = f"{base_url}{endpoint}/`{id}`/applications"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

In case of success we will obtain an output as follow:

#### Sample Output for Get ODS Instance Applications

```json
[
  {
    'id': 1,
    'applicationName': 'Acme Learning',
    'claimSetName': 'Acme Learning User',
    'educationOrganizationIds': [
      0
    ],
    'vendorId': 1,
    'profileIds': [

    ],
    'odsInstanceIds': [
      1
    ]
  }
]
```

### Update an ODS Instance

You can use the following code to update the information in the ODS instance.

#### PUT /v2/odsInstances/`{id}`

```python
def edit_ods_instance(
    base_url: str,
    access_token: str,
    payload: dict,
    id: int,
) -> dict:
    '''
        Updates an ods instance based on resource id

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "name": "string",
                "instanceType": "string",
                "connectionString": "string"
              }
        id: int
            Resource ID
    '''
    endpoint = "/v2/odsInstances"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }
    r = requests.put(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 200 Status Code

### Delete an ODS Instance

To delete a ods instance you can use the next point, as the example provided
below.

#### DELETE /v2/odsInstances/`{id}`

```python
def delete_ods_instance(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Deletes an existing ods instance using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/odsInstances"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.delete(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

The output will be a confirmation as follows:

#### Sample Output for Delete an ODS Instance

```json
{
  "title": "Ods Instance deleted successfully"
}
```

## ODS Instance Derivatives

### Retrieve a Listing of ODS instance derivatives

See the [Endpoints - Admin
API](https://edfi.atlassian.net/wiki/spaces/ADMINAPI/pages/21300937/Endpoints+in+Admin+API+2.x)
page for a complete list of resources and parameters. For this example, we will
get a list of providers.  

#### GET /v2/odsInstanceDerivatives

```python
def get_ods_instance_derivatives(
    base_url: str,
    access_token: str,
) -> dict:
    '''
        Retrieves ods instance derivatives

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer

        Returns
        -------
        r: List[Dict[str, str]]
            Returns a list of dictionaries from the request
            converted from JSON format.
            [
                [
                    {
                        "id": 0,
                        "odsInstanceId": 0,
                        "derivativeType": "string"
                    }
                ]
            ]
    '''
    endpoint = "/v2/odsInstanceDerivatives?offset=0&limit=25"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

We will get a list of the ods instances, JSON formatted, as in the example
below.

#### Sample Output for Retrieve a Listing of ODS Instance Derivatives

```json
[
  {
    'id': 2,
    'odsInstanceId': 1,
    'derivativeType': 'ReadReplica'
  }
]

```

### Create an ODS Instance derivatives

To create a new ods instance, we will use the POST verb.

#### Sample Input for Create an ODS Instance Derivative

```json
odsinstancederivative_payload = {
 "odsInstanceId": 1,
    "derivativeType": "ReadReplica",
    "connectionString": "Server=localhost;Database=EdFi_Ods;Integrated Security=True;"
}
```

Which we will pass as a parameter to a function as shown below, or with the
method of your choice.

#### POST /v2/odsInstanceDerivatives

```python
def create_ods_instance_derivative(
    base_url: str,
    access_token: str,
    payload: dict,
) -> dict:
    '''
        Creates an ODS instance derivative based on supplied values

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "odsInstanceId": 0,
                "derivativeType": "string",
                "connectionString": "string"
            }
    '''
    endpoint = "/v2/odsInstanceDerivatives"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.post(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 201 Status Code

### Get an ODS Instance derivative

In the case that you want to retrieve information from one of the ods instances,
you will need to use the resource ID.

#### GET /v2/odsInstanceDerivatives/`{id}`

```python
def get_ods_instance_derivative(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing ods instance derivative using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/odsInstanceDerivatives"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

In case of success we will obtain an output as follow:

#### Sample Output for Get an ODS Instance Derivative

```json
{
  'id': 1,
  'odsInstanceId': 1,
  'derivativeType': 'ReadReplica'
}
```

### Update an ODS Instance derivative

You can use the following code to update the information in the ODS instance
derivative.

#### PUT /v2/odsInstanceDerivatives/`{id}`

```python
def edit_ods_instance_derivative(
    base_url: str,
    access_token: str,
    payload: dict,
    id: int,
) -> dict:
    '''
        Updates an ods instance derivative based on resource id

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "odsInstanceId": 0,
                "derivativeType": "string",
                "connectionString": "string"
            }
        id: int
            Resource ID
    '''
    endpoint = "/v2/odsInstanceDerivatives"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }
    r = requests.put(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 200 Status Code

### Delete an ODS Instance derivative

To delete a ods instance derivative you can use the next point, as the example
provided below.

#### DELETE /v2/odsInstanceDerivatives/`{id}`

```python
def delete_ods_instance_derivative(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Deletes an existing ods instance derivative using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/odsInstanceDerivatives"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.delete(
        url=url,
        headers=headers,
        verify=False,
        )

    return r
```

As a result, we will obtain a 200 Status Code

## ODS Instance Contexts

### Retrieve a Listing of ODS instance contexts

See the [Endpoints - Admin
API](https://edfi.atlassian.net/wiki/spaces/ADMINAPI/pages/21300937/Endpoints+in+Admin+API+2.x)
page for a complete list of resources and parameters. For this example, we will
get a list of providers.

#### GET /v2/odsInstanceContexts

```python
def get_ods_instance_contexts(
    base_url: str,
    access_token: str,
) -> dict:
    '''
        Retrieves ods instance contexts

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer

        Returns
        -------
        r: List[Dict[str, str]]
            Returns a list of dictionaries from the request
            converted from JSON format.
            [
                {
                    "id": 0,
                    "odsInstanceId": 1,
                    "contextKey": "contextKeyText",
                    "contextValue": "2024"
                }
            ]
    '''
    endpoint = "/v2/odsInstanceContexts?offset=0&limit=25"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

We will get a list of the ods instances, JSON formatted, as in the example
below.

#### Sample Output for Retrieve a Listing of ODS Instance Contexts

```json
[
  {
    'id': 1,
    'odsInstanceId': 1,
    'contextKey': 'contextKeyText',
    'contextValue': '2024'
  }
]
```

### Create an ODS Instance Context

To create a new ods instance, we will use the POST verb.

#### Sample Input for Create an ODS Instance Context

```json
odsinstancecontext_payload = {
 "odsInstanceId": 1,
 "contextKey": "contextKeyText",
 "contextValue": "2024"
}
```

Which we will pass as a parameter to a function as shown below, or with the
method of your choice.

#### POST /v2/odsInstanceContexts

```python
def create_ods_instance_context(
    base_url: str,
    access_token: str,
    payload: dict,
) -> dict:
    '''
        Creates an ODS instance context based on supplied values

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "odsInstanceId": 0,
                "contextKey": "string",
                "contextValue": "string"
            }
    '''
    endpoint = "/v2/odsInstanceContexts"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.post(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 201 Status Code

### Get an ODS Instance Context

In the case that you want to retrieve information from one of the ods instance
context, you will need to use the resource ID.

#### GET /v2/odsInstanceContexts/`{id}`

```python
def get_ods_instance_context(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing ods instance context using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/odsInstanceContexts"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

In case of success we will obtain an output as follow:

#### Sample Output for Get an ODS Instance Context

```json
{
  'id': 1,
  'odsInstanceId': 1,
  'contextKey': 'contextKeyText',
  'contextValue': '2024'
}
```

### Update an ODS Instance Context

You can use the following code to update the information in the ODS instance
context.

#### PUT /v2/odsInstanceContexts/`{id}`

```python
def edit_ods_instance_context(
    base_url: str,
    access_token: str,
    payload: dict,
    id: int,
) -> dict:
    '''
        Updates an ods instance context based on resource id

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "odsInstanceId": 0,
                "contextKey": "string",
                "contextValue": "string"
            }
        id: int
            Resource ID
    '''
    endpoint = "/v2/odsInstanceContexts"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }
    r = requests.put(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 200 Status Code

### Delete an ODS Instance Context

To delete a ods instance context you can use the next point, as the example
provided below.

#### DELETE /v2/odsInstanceContexts/`{id}`

```python
def delete_ods_instance_context(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Deletes an existing ods instance context using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/odsInstanceContexts"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.delete(
        url=url,
        headers=headers,
        verify=False,
        )

    return r
```

As a result, we will obtain a 200 Status Code

## Applications

### Create an Application and Set of Credentials

To create an application, we use the POST verb, and we will pass it a dictionary
with the values to store, an example of payload for this case could be the
following.

#### Sample data create application

```json
application_payload = {
            "applicationName": "Acme Learning",
            "vendorId": 1,
            "claimSetName": "Acme Learning User",
            "educationOrganizationIds": [
                0
            ],
     "odsInstanceIds": [
       0
   ]
        }
```

Which we will use inside a variable to pass it inside a function like a payload.

#### POST /v2/applications

```python
def create_application(
    base_url: str,
    access_token: str,
    payload: dict,
) -> dict:
    '''
        Creates a application based on supplied values

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "applicationName": "string",
                "vendorId": 0,
                "claimSetName": "string",
                "profileId": 0,
                "educationOrganizationIds": [
                    0
                ]
            }
    '''
    endpoint = "/v2/applications"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }
    r = requests.post(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r.json()
```

The result of the code above it will give you an output as follows.

#### Sample Output

```json
{
  "applicationId": 4,
  "key": "ZQeSgtdaj2GI",
  "secret": "XHuwnSJLxkWUKfXzYAXkSkaG"
}
```

### Retrieve application data

Where you can obtain the key and secret from the response, and save the
application ID. If you need to verify that your app was created, you can use the
code as follows with the App ID.

#### GET /v2/applications/`{id}`

```python
def get_application(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing application using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/applications"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

The confirmation outcome will be like the following:

#### Sample Output for Retrieve application data

```json
{
  "applicationId": 1,
  "applicationName": "Acme Learning",
  "claimSetName": "Acme Learning User",
  "profileName": null,
  "educationOrganizationId": 0,
  "odsInstanceName": null
}

```

### Update an application

You can use the following code to update the information in the application.

#### PUT /v2/applications/`{id}`

```python
def edit_application(
    base_url: str,
    access_token: str,
    payload: dict,
    id: int,
) -> dict:
    '''
        Updates an application based on resource id

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "applicationName": "string",
                "vendorId": 0,
                "claimSetName": "string",
                "profileId": 0,
                "educationOrganizationIds": [
                    0
                ]
            }
        id: int
            Resource ID
    '''
    endpoint = "/v2/applications"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }
    r = requests.put(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r.json()
```

As a result, we will obtain a 200 Status Code

### Delete an application

To delete an application the example will be the following.

#### DELETE /v2/applications/`{id}`

```python
def delete_application(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Deletes an existing application using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/applications"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.delete(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

The output will be as follow:

#### Sample Output for Delete an application

```json
{
  "title": "Application deleted successfully"
}


```

### Refresh application credentials

In case you want to refresh your credentials or get a new ones you can use the
next endpoint.

**PUT /v2/applications/`{id}`/reset-credential**

```python
def reset_application_credentials(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing application using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/applications"
    url = f"{base_url}{endpoint}/`{id}`/reset-credential"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.put(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

The resulting output will again print the new secret keys.

#### Sample Output for Refresh application credentials

```json
{
  "applicationId": 4,
  "key": "ZQeSgtdaj2GI",
  "secret": "GeAepnauytC1NqaJV2HKfhit"
}
```

### Create multiple applications using a CSV file

In case you want to create multiple applications, you can use the following
template and code sample to do so:

CSV file template
→ [apps.csv](https://edfi.atlassian.net/wiki/download/attachments/21301321/apps.csv?version=2&modificationDate=1721410503374&cacheVersion=1&api=v2)

Columns description

* Name: (Required) The application name
* VendorId: (Required) Set the vendor id as numeric value. e.g. 2
* ClamsetName: (Required) The claimset to be used. e.g. SIS Vendor
* ProfileIds: (Optional) List with the profile ids. This cell is not required,
  but in case you need to set it the format should be a single id or multiple.
  In case of multiple values, use the dash to separate them, e.g. 10-20-30
* EdOrgIds: (Required) List with the eduction organization ids. This cell is
  required, the format should be a single id or multiple. In case of multiple
  values, use the dash to separate them, e.g. 10023-20020-304040
* OdsInstanceIds: (Required) List with the ods instance ids. This cell is
  required, the format should be a single id or multiple. In case of multiple
  values, use the dash to separate them, e.g. 10023-20020-304040

:::info

* The following code sample uses the
   ["create\_application"](https://edfi.atlassian.net/wiki/spaces/ADMINAPI/pages/21301321/Quick+Start+Calling+Admin+API+2.x+using+Python#QuickStartCallingAdminAPI2.usingPython-create_app)
   script used to create an application, so don't forget to create it and
   import it before using this script.
* This code uses the Pandas library, so you need to install it before.
  * Use pip to install the library: "pip install pandas"
  * For more details: [Installation — pandas 2.2.2 documentation
     (pydata.org)](https://pandas.pydata.org/pandas-docs/stable/getting_started/install.html)

:::

**import\_applications.py**

```python
import pandas
import math
import numbers
import applications #script where you have the create_application

def import_applications(
    base_url: str,
    access_token: str,
    file_path: str,
) -> dict:
    '''
        Creates applications from csv file

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        file_path: str
            String with the CSV location
    '''
    df = pandas.read_csv(file_path)
    for index, row in df.iterrows():
        profileIds = []
        print(row)
        if "-" in str(row[3]):
            profileIds = [int(i) for i in row[3].split('-')]
        elif isinstance(row[3], numbers.Number) and not math.isnan(row[3]):
            profileIds = [int(row[3])]
        elif isinstance(row[3], numbers.Number):
            profileIds = []

        edOrgIds = [int(i) for i in row[4].split('-')]
        odsIds = [int(i) for i in row[5].split('-')]

        application_payload = {
                "applicationName": row[0],
                "vendorId": row[1],
                "claimSetName": row[2],
                "profileIds": profileIds,
                "educationOrganizationIds": edOrgIds,
                "odsInstanceIds": odsIds
            }
        print(application_payload)
        print(applications.create_application(base_url, access_token, application_payload))
```

As a result, we will obtain multiple 201 Status Code

## Api Clients

### Create ApiClient for a given Application

To create an ApiClient, we use the POST verb, and we will pass it a dictionary
with the values to store, an example of payload for this case could be the
following.

#### Sample data create ApiClient

```json
apiclient_payload = {
        "name": "ApiClient",
        "isApproved": true,
        "applicationId": 1,
        "odsInstanceIds": [
            1
        ]
    }
```

Which we will use inside a variable to pass it inside a function like a payload.

#### POST /v2/apiclients

```python
def create_apiclient(
    base_url: str,
    access_token: str,
    payload: dict,
) -> dict:
    '''
        Creates an ApiClient based on supplied values

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "name": "string",
                "isApproved": true,
                "applicationId": 0,
                "odsInstanceIds": [
                    0
                ]
            }
    '''
    endpoint = "/v2/apiclients"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }
    r = requests.post(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r.json()
```

The result of the code above it will give you an output as follows.

#### Sample Output

```json
{
  "id": 1,
  "name": "ApiClient",
  "key": "mEbKpWVUtEmP",
  "secret": "NKOKV8j0S21bp9XX0fuyJUfJ",
  "applicationId": 1
}
```

### Retrieve ApiClient data

Where you can obtain the key and secret from the response.
If you need to verify that your ApiClient was created, you can use the
code as follows with the ApiClient ID.

#### GET /v2/apiclients/`{id}`

```python
def get_apiclient(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing ApiClient using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/apiclients"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

The confirmation outcome will be like the following:

#### Sample Output for Retrieve ApiClient data

```json
{
  "id": 2,
  "key": "mEbKpWVUtEmP",
  "name": "ApiClient",
  "isApproved": true,
  "useSandbox": false,
  "sandboxType": 0,
  "applicationId": 1,
  "keyStatus": "Active",
  "educationOrganizationIds": [],
  "odsInstanceIds": [
    1
  ]
}

```

### Update an ApiClient

You can use the following code to update the information in the ApiClient.

#### PUT /v2/apiclients/`{id}`

```python
def edit_apiclient(
    base_url: str,
    access_token: str,
    payload: dict,
    id: int,
) -> dict:
    '''
        Updates an ApiClient based on resource id

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "name": "string",
                "isApproved": true,
                "applicationId": 0,
                "odsInstanceIds": [
                    0
                ]
            }
        id: int
            Resource ID
    '''
    endpoint = "/v2/apiclients"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }
    r = requests.put(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
    )

    return r.json()
```

As a result, we will obtain a 200 Status Code

### Delete an ApiClient

To delete an ApiClient the example will be the following.

#### DELETE /v2/apiclients/`{id}`

```python
def delete_apiclient(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Deletes an existing ApiClient using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/apiclients"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
    }

    r = requests.delete(
        url=url,
        headers=headers,
        verify=False,
    )

    return r.json()
```

The output will be as follow:

#### Sample Output for Delete an ApiClient

```json
{
  "title": "ApiClient deleted successfully"
}


```

### Refresh ApiClient credentials

In case you want to refresh your credentials or get a new ones you can use the
next endpoint.

**PUT /v2/apiclients/`{id}`/reset-credential**

```python
def reset_apiclient_credentials(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing ApiClient using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/apiclients"
    url = f"{base_url}{endpoint}/`{id}`/reset-credential"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.put(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

The resulting output will again print the new secret keys.

#### Sample Output for Refresh apiclient credentials

```json
{
  "id": 1,
  "name": "ApiClient",
  "key": "mEbKpWVUtEmP",
  "secret": "Dhh1kJp8606G4RDLpAa5M93a",
  "applicationId": 1
}
```

## Profiles

### Retrieve a Listing of Profiles

See the [Endpoints - Admin
API](https://edfi.atlassian.net/wiki/spaces/ADMINAPI/pages/21300937/Endpoints+in+Admin+API+2.x)
page for a complete list of resources and parameters. For this example, we will
get a list of providers.

#### GET /v2/profiles

```python
def get_profiles(
    base_url: str,
    access_token: str,
) -> dict:
    '''
        Retrieves profiles

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer

        Returns
        -------
        r: List[Dict[str, str]]
            Returns a list of dictionaries from the request
            converted from JSON format.
            [
                {
                    "id": 0,
                    "name": "string"
                }
            ]
    '''
    endpoint = "/v2/profiles?offset=0&limit=25"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

We will get a list of the ods instances, JSON formatted, as in the example
below.

#### Sample Output for Retireve a Listing of Profiles

```json
[
  {
    'id': 1,
    'name': 'Test-Profile'
  }
]
```

### Create a profile

To create a new profile, we will use the POST verb.

#### Sample Input for Create a profile

```json
profile_payload = {
        "name": "Test-Profile",
        "definition": "<Profile name=\"Test-Profile\"><Resource name=\"Resource1\"><ReadContentType memberSelection=\"IncludeOnly\"><Collection name=\"Collection1\" memberSelection=\"IncludeOnly\"><Property    name=\"Property1\" /><Property name=\"Property2\" /></Collection></ReadContentType><WriteContentType memberSelection=\"IncludeOnly\"><Collection name=\"Collection2\" memberSelection=\"IncludeOnly\"><Property name=\"Property1\" /><Property name=\"Property2\" /></Collection></WriteContentType></Resource></Profile>"
    }
```

Which we will pass as a parameter to a function as shown below, or with the
method of your choice.

#### POST /v2/profiles

```python
def create_profile(
    base_url: str,
    access_token: str,
    payload: dict,
) -> dict:
    '''
        Creates a profile based on supplied values

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "name": "Test-Profile",
                "definition": "<Profile name=\"Test-Profile\"><Resource name=\"Resource1\"><ReadContentType memberSelection=\"IncludeOnly\"><Collection name=\"Collection1\" memberSelection=\"IncludeOnly\"><Property    name=\"Property1\" /><Property name=\"Property2\" /></Collection></ReadContentType><WriteContentType memberSelection=\"IncludeOnly\"><Collection name=\"Collection2\" memberSelection=\"IncludeOnly\"><Property name=\"Property1\" /><Property name=\"Property2\" /></Collection></WriteContentType></Resource></Profile>"
            }
    '''
    endpoint = "/v2/profiles"
    url = f"{base_url}{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.post(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 201 Status Code

### Get Profile

In the case that you want to retrieve information from one of the profiles, you
will need to use the resource ID.

#### GET /v2/profiles/`{id}`

```python
def get_profile(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Get an existing profile using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/profiles"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.get(
        url=url,
        headers=headers,
        verify=False,
        )

    return r.json()
```

In case of success we will obtain an output as follow:

#### Sample Output for Get Profile

```json
{
  'definition': '<Profile name="Test-Profile"><Resource name="Resource1"><ReadContentType memberSelection="IncludeOnly"><Collection name="Collection1" memberSelection="IncludeOnly"><Property    name="Property1" /><Property name="Property2" /></Collection></ReadContentType><WriteContentType memberSelection="IncludeOnly"><Collection name="Collection2" memberSelection="IncludeOnly"><Property name="Property1" /><Property name="Property2" /></Collection></WriteContentType></Resource></Profile>',
  'id': 1,
  'name': 'Test-Profile'
}
```

### Update a Profile

You can use the following code to update the information in the profile.

#### PUT /v2/profiles/`{id}`

```python
def edit_profile(
    base_url: str,
    access_token: str,
    payload: dict,
    id: int,
) -> dict:
    '''
        Updates a profile based on resource id

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        payload: dict
            {
                "name": "Test-Profile",
                "definition": "<Profile name=\"Test-Profile\"><Resource name=\"Resource1\"><ReadContentType memberSelection=\"IncludeOnly\"><Collection name=\"Collection1\" memberSelection=\"IncludeOnly\"><Property    name=\"Property1\" /><Property name=\"Property2\" /></Collection></ReadContentType><WriteContentType memberSelection=\"IncludeOnly\"><Collection name=\"Collection2\" memberSelection=\"IncludeOnly\"><Property name=\"Property1\" /><Property name=\"Property2\" /></Collection></WriteContentType></Resource></Profile>"
            }
        id: int
            Resource ID
    '''
    endpoint = "/v2/profiles"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }
    r = requests.put(
        url=url,
        headers=headers,
        json=payload,
        verify=False,
        )

    return r
```

As a result, we will obtain a 200 Status Code

### Delete a Profile

To delete a profile you can use the next point, as the example provided below.

#### DELETE /v2/profiles/`{id}`

```python
def delete_profile(
    base_url: str,
    access_token: str,
    id: int,
) -> dict:
    '''
        Deletes an existing profile using the resource identifier

        Parameters
        ----------
        base_url: str
            URL where API is hosted
        access_token: str
            String with the authorization token bearer
        id: int
            Resource identifier
    '''
    endpoint = "/v2/profiles"
    url = f"{base_url}{endpoint}/`{id}`"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/json',
        'Accept': 'text/plain',
        }

    r = requests.delete(
        url=url,
        headers=headers,
        verify=False,
        )

    return r
```

As a result, we will obtain a 200 Status Code
