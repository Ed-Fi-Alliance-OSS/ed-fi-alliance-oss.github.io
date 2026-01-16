# Configuring an Identity Provider for Ed-Fi Admin App

The Ed-Fi Admin App uses an Open ID Connect (OIDC) compatible Identity Provider (IdP) for managing users accounts. In theory any OIDC-compatible IdP will suffice. The Ed-Fi Alliance development to date has only tested Keycloak. Another development team has used Auth0. Further documentation on alternatives to Keycloak will be provided here when available.

## General IdP Guidance and Configuration

:::note

To be written:

- Describe the backend config file settings for the IdP.
- Describe the bootstrap user concept.
- The application uses cookie-based authentication, and Admin App's backend API service has its own authorization scheme. This means that the user setup through an IdP does not need any special claims or scopes; they simply need to have a valid account.

:::

## Using Keycloak

:::note

To be written:

- Short paragraph describing Keycloak as a well-supported open source project
- Notes on creating a realm
- Notes on creating a client for the Admin App backend service
- Brief notes on creating users
- Keep this brief and do not add screenshots. Refer to Keycloak help for more detailed guidance.

:::

### HTTP Security for Keycloak

:::warning

The Ed-Fi Alliance software developers are not network security experts. Please consult your own trusted experts and information sources when applying these notes to your environment. The challenges of properly securing an IdP are a strong argument for using third-party managed service.

:::

The Ed-Fi Alliance's development and testing environments use Keycloak hosted inside of a Docker container, with NGiNX providing a reverse proxy layer. Our network configuration is a high trust environment: inside the container network we do not use Transport Layer Security (TLS). In other words, we allow `http` instead of enforcing `https`. This frees up the development team from needing to configure a certificate in Keycloak; the NGiNX reverse proxy handles the TLS termination. However, this is not a universally accepted best practice. Many practitioners prefer a [Zero Trust](https://www.cisa.gov/topics/cybersecurity-best-practices/zero-trust) architecture that assumes the network has been compromised and unsecured connections will be intercepted.

We have found the following NGiNX configuration to be useful for our high-trust configuration:

```none
location /auth {
    proxy_pass http://keycloak:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Port 443;
    proxy_redirect off;

    # Do not set "HttpOnly" below, as Keycloak can't handle it: https://github.com/keycloak/keycloak/pull/16747
    proxy_cookie_flags ~ Secure SameSite=Strict;

    proxy_hide_header Content-Security-Policy;

    # Allowing 'unsafe-inline' for script-src and style-src are required for using Keycloak's UI: https://github.com/keycloak/keycloak/issues/16277
    # ... this version is preferred and works in a more production-like deployment
    # add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none'; script-src 'self' 'unsafe-inline';  style-src 'self' 'unsafe-inline';";
    # ... and this version works better for localhost development. It removes the form-action restriction.
    add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'self'; object-src 'none'; script-src 'self' 'unsafe-inline';  style-src 'self' 'unsafe-inline';";
}
```

Notes:

- Cookie
  - The comment about `HttpOnly` above refers to the common weakness [CWE-1004: Sensitive Cookie Without 'HttpOnly' Flag](https://cwe.mitre.org/data/definitions/1004.html).
  - The `SameSite` setting addresses common weakness [CWE-1275: Sensitive Cookie with Improper SameSite Attribute](https://cwe.mitre.org/data/definitions/1275.html)
- Content Security Policy
  - There may be much better settings than these to address [CWE-942: Permissive Cross-domain Security Policy with Untrusted Domains](https://cwe.mitre.org/data/definitions/942.html), but these are what we have been able to work with.

:::tip

The header values can also be managed directly through Keycloak's realm settings; we chose to use the reverse proxy layer so that we would not need to spend time resetting (or automating) the Keycloak settings after frequent developer teardown / restart operations. The default Keycloak header settings also adds these headers:

```none
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-Robots-Tag: none
X-Xss-Protection: 1; mode=block
```

:::

### Key Rotation in Keycloak

The Ed-Fi Admin App has its own client credentials (aka "key and secret") for
connecting to the OAuth provider, such as Keycloak. As a best practice, many
organizations require regular rotation of keys and secrets - the longer a secret
is active, the more opportunity there is for it to be stolen.

Keycloak does not support client secret rotation as a default feature. Secret
rotation is available as a preview feature; it is disabled by default. To enable
secret rotation, administrators need to manually configure and activate this
feature within Keycloak settings.

#### Enable client secret rotation feature on docker

To enable client secret rotation in Keycloak when running in Docker, add this
under environment in your docker-compose.yml

```yml
  environment:
      KC_FEATURES: client-secret-rotation
```

#### Create a Client Profile with Secret Rotation Executor

- Navigate to Realm Settings > Client Policies > Profiles.
- Click on Create client profile and provide a name and description.
- After saving, add an executor of type `secret-rotation`.
- Configure the executor with parameters such as:
  1. Secret Expiration: Maximum duration (in seconds) a secret remains valid.
  2. Rotated Secret Expiration: Duration (in seconds) a rotated (previous)
     secret remains valid.
  3. Remain Expiration Time: Time window (in seconds) before secret expiration
     during which updates trigger rotation.

#### Create a Client Policy

- Still under Client Policies, navigate to the Policies tab.
- Click on Create client policy and provide a name and description.
- Add conditions to specify which clients the policy applies to (e.g., clients
  with a specific access type or role).
- Associate the previously created client profile with this policy.

#### Apply the Policy to Existing Clients

- During the creation of new clients, if the client secret rotation policy is
  active, the behavior will be applied automatically.
- For existing clients to adopt the new secret rotation behavior, an update
  action is required: Navigate to `Clients > [Select Client] > Credentials` tab.
  Click on Regenerate Secret to trigger the rotation mechanism as per the defined
  policy.

For detailed guidance, refer to the [Keycloak Server Administration Guide on
Client Secret
Rotation](https://www.keycloak.org/docs/latest/server_admin/index.html#_proc-secret-rotation).
