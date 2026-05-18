# Troubleshooting

## Backend Troubleshooting

**Common Issues and Solutions:**

**Node.js Executable Not Found:**

- **Error**: "The iisnode module is unable to start the node.exe process..."
- **Cause**: IIS cannot find the Node.js executable
- **Solution**:
  1. **Find your Node.js installation path**:

     ```powershell
     # Check where Node.js is installed
     where node
     
     # Or check the version and default location
     node --version
     # Default locations:
     # C:\Program Files\nodejs\node.exe (standard installation)
     # C:\Program Files (x86)\nodejs\node.exe (32-bit installation)
     ```
  
  2. **Update the `nodeProcessCommandLine` in web.config**:

     ```xml
     <!-- For standard Node.js installation -->
     nodeProcessCommandLine="C:\Program Files\nodejs\node.exe"
     
     <!-- For NVM (Node Version Manager) installation -->
     nodeProcessCommandLine="%APPDATA%\nvm\v18.17.0\node.exe"
     <!-- Replace v18.17.0 with your actual Node.js version -->
     ```
  
  3. **For NVM (Node Version Manager) users**:

     **Find your current Node.js version and path:**

     ```powershell
     # Check your current Node.js version
     node --version
     
     # Check nvm list to see installed versions
     nvm list
     
     # Check the exact path
     where node
     ```

     **Common NVM paths:**
     - `%APPDATA%\nvm\v{version}\node.exe` (nvm-windows)
     - `C:\Users\{username}\AppData\Roaming\nvm\v{version}\node.exe` (full path)
     - `%NVM_HOME%\v{version}\node.exe` (if NVM_HOME is set)

     **Example for Node.js v18.17.0:**

     ```xml
     nodeProcessCommandLine="%APPDATA%\nvm\v18.17.0\node.exe"
     ```

     **Alternative approach for NVM - Use symlink:**

     ```xml
     <!-- If nvm creates a symlink (some nvm versions do this) -->
     nodeProcessCommandLine="%APPDATA%\nvm\nodejs\node.exe"
     ```

  4. **Alternative locations to check**:
     - `C:\Program Files\nodejs\node.exe` (standard installation)
     - `C:\Program Files (x86)\nodejs\node.exe` (32-bit)
     - `%APPDATA%\nvm\v{version}\node.exe` (nvm-windows)
     - `%APPDATA%\npm\node.exe` (npm global installations)
     - Custom installation directory

**Duplicate MIME Type Error:**

- **Error**: "Cannot add duplicate collection entry of type 'mimeMap' with unique key attribute 'fileExtension' set to '.json'"
- **Cause**: IIS already has a MIME type mapping for `.json` files
- **Solution**: Use the `<remove>` element before adding the MIME type:

  ```xml
  <staticContent>
    <!-- Remove existing .json mapping if it exists, then add our own -->
    <remove fileExtension=".json" />
    <mimeMap fileExtension=".json" mimeType="application/json" />
  </staticContent>
  ```

**HTTP Error 403.14 - Forbidden:**

- **Cause**: IIS cannot find the default document or directory browsing is disabled
- **Solution**:
  1. Ensure `web.config` is in the same directory as `main.js`
  2. Verify the `<defaultDocument>` section includes `main.js`
  3. Check that the physical path in IIS points to the directory containing `main.js`
  4. Verify iisnode is properly installed and the handler is registered

**HTTP Error 404.0 - Not Found for `/api` routes:**

- **Cause**: Requests aren't being routed through the Node.js application
- **Solution**:
  1. The updated `web.config` above includes rewrite rules to handle this
  2. Ensure the `<rewrite>` section is present (this is different from URL Rewrite module)
  3. Verify that all API requests go through `main.js`

**Testing Your Deployment:**

1. **Test the root endpoint**: `http://localhost:3333/` should return your Node.js application response
2. **Test API endpoints**: `http://localhost:3333/api/` should work for API routes
3. **Test Swagger**: `http://localhost:3333/api/` should show the Swagger documentation if enabled
4. **Check iisnode logs**: Look in the `iisnode` folder for detailed error logs

**Debugging Steps:**

1. **Enable detailed errors** in the `web.config` (already enabled in the config above):

   ```xml
   debuggingEnabled="true"
   devErrorsEnabled="true"
   ```

2. **Check Windows Event Viewer**: Look for IIS and iisnode related errors

3. **Verify file permissions**: Ensure IIS has read access to your application files

4. **Test Node.js directly**: Before deploying to IIS, test that `node main.js` works locally

**Configuration Issues:**

**NODE_ENV Configuration Warning:**

- **Warning**: "NODE_ENV value of 'production' did not match any deployment config file names"
- **Cause**: Application running in production mode but no production.js config file exists
- **Solutions**:
  1. **Use development mode** in web.config:

     ```xml
     node_env="development"
     ```

  2. **Create production.js** config file in the config directory with production settings
  3. **Add promoteServerVars** to ensure environment variables are passed:

     ```xml
     promoteServerVars="NODE_ENV"
     ```

**Database Password Error:**

- **Error**: "SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
- **Cause**: PostgreSQL password not being passed as a proper string
- **Solution**: Ensure all database credentials in config are strings:

  ```javascript
  DB_SECRET_VALUE: {
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    DB_USERNAME: 'postgres',
    DB_DATABASE: 'sbaa',
    DB_PASSWORD: 'postgres',  // Ensure this is a string
  }
  ```

### Proven Working Configuration

The following configuration has been **tested and verified** to work successfully:

**Essential Components:**

1. **iisnode** installed and registered as an IIS module
2. **Handler mapping** configured in IIS Manager (not web.config) with path `*`
3. **URL Rewrite rules** in web.config for proper request routing
4. **Proper permissions** for IIS App Pool user on application directory

**This minimal web.config configuration is known to work:**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <!-- URL Rewrite rules - THE KEY TO SUCCESS -->
    <rewrite>
      <rules>
        <rule name="NodeJS" stopProcessing="true">
          <match url=".*"/>
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true"/>
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true"/>
          </conditions>
          <action type="Rewrite" url="main.js"/>
        </rule>
      </rules>
    </rewrite>
    
    <iisnode 
      nodeProcessCommandLine="node.exe"
      loggingEnabled="true"
      debuggingEnabled="true"
      devErrorsEnabled="true"
      node_env="development" />
      
    <defaultDocument>
      <files>
        <add value="main.js"/>
      </files>
    </defaultDocument>
    
    <httpErrors errorMode="Detailed"/>
  </system.webServer>
</configuration>
```

### Advantages of Direct IIS Deployment

- **Direct integration**: Node.js runs directly within IIS worker process
- **Better error handling**: iisnode provides detailed error logging
- **Process management**: IIS handles process recycling and monitoring
- **Native Windows integration**: Works seamlessly with Windows authentication and security

### Considerations

- **URL Rewrite dependency**: Requires URL Rewrite rules for proper routing (not the URL Rewrite module)
- **Handler configuration**: Must be done via IIS Manager due to security restrictions
- **Port binding**: The application uses the port configured in IIS, accessed via `process.env.PORT`
- **Logging**: iisnode provides its own logging mechanism in addition to your application logs

### Build errors

Check configuration file `production.js` or `local.js` variables are set correctly. Sometimes you need to execute `nx reset` in order to get a new build without caching files. You can include the command in yout `package.json` as `cache: nx reset` and then use it `npm run cache`

## Frontend Troubleshooting

**Common Frontend Deployment Issues:**

**Duplicate MIME Type Error (HTTP 500.19):**

- **Error**: "Cannot add duplicate collection entry of type 'mimeMap' with unique key attribute 'fileExtension' set to '.json'"
- **Cause**: IIS already has MIME type mappings for certain file extensions
- **Solution**: Use `<remove>` elements before `<mimeMap>` elements as shown in the web.config above

**React Router 404 Errors:**

- **Symptom**: Direct URLs (like `/dashboard`) return 404 errors, but navigation within the app works
- **Cause**: IIS tries to serve routes as static files instead of letting React Router handle them
- **Solution**: Ensure the URL Rewrite rule for React Routes is properly configured

**Static Asset Loading Issues:**

- **Symptom**: CSS, JS, or font files return 404 or MIME type errors
- **Cause**: Missing or incorrect MIME type mappings
- **Solution**: Add proper MIME type mappings in the `<staticContent>` section

**API Communication Errors:**

- **Symptom**: Frontend loads but API calls fail
- **Cause**: CORS issues or incorrect API URL configuration
- **Solution**: Verify `VITE_API_URL` build variable points to your API endpoint

## Common Issues

### Database Connection Errors

```bash
# Check database connectivity
psql -h localhost -U edfiadminapp -d sbaa

# Check database logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

### API Startup Issues

```bash
# Check API logs
tail -f /opt/edfiadminapp/logs/application.log

# Check service status
sudo systemctl status edfiadminapp-api

# Check service logs
sudo journalctl -u edfiadminapp-api -f
```

### Authentication Issues

1. **OIDC Configuration**: Verify OIDC provider is accessible
2. **Client Configuration**: Check client ID and secret
3. **Redirect URIs**: Ensure redirect URIs match exactly
4. **Network**: Verify network connectivity to OIDC provider

### Frontend Issues

1. **Build errors**: Check environment variables are set correctly. Sometimes you need to execute `nx reset` in order to get a new build without caching files. You can include the command in yout `package.json` as `cache: nx reset` and then use it `npm run cache`
2. **Routing issues**: Verify web server is configured for SPA routing
3. **API connectivity**: Check CORS and network connectivity
