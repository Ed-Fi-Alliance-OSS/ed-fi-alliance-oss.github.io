---
sidebar_position: 4
---

# Unix-like Systems Installation

This page describes how to install the Ed-Fi Admin App on a Unix-like server (for example, Linux), using systemd to run the backend API and NGiNX to serve the frontend and proxy the API.

:::note
This is one of three alternative installation paths. If you instead want to run the Admin App in containers or on Windows IIS, see [Docker Compose Installation](./docker-installation.md) or [Windows IIS Installation](./windows-iis-installation.md).
:::

## Unix Prerequisites

- **NGiNX**: For reverse proxy and static file serving
- **Node.js**: Version 22.0.0+
- **PostgreSQL**: Database server
- **systemd**: For service management (most modern Linux distributions)

## Unix Backend API Installation

1. **Create application user**:

   ```bash
   sudo useradd --system --create-home --shell /bin/bash edfiadminapp
   sudo mkdir -p /opt/edfiadminapp
   sudo chown edfiadminapp:edfiadminapp /opt/edfiadminapp
   ```

2. **Install and build application**:

   ```bash
   sudo -u edfiadminapp bash
   cd /opt/edfiadminapp
   git clone https://github.com/Ed-Fi-Alliance-OSS/AdminApp-v4.git .
   npm ci
   npm run build:api
   ```

3. **Create configuration file**:

   ```bash
   sudo -u edfiadminapp cat > packages/api/config/local.js << 'EOF'
   module.exports = {
     DB_SECRET_VALUE: {
       DB_USERNAME: 'edfiadminapp',
       DB_PASSWORD: 'your_secure_password',
       DB_HOST: 'localhost',
       DB_PORT: 5432,
       DB_DATABASE: 'sbaa'
     },
     AUTH0_CONFIG_SECRET_VALUE: {
       ISSUER: 'https://your-domain.com/auth/realms/edfi',
       CLIENT_ID: 'edfiadminapp',
       CLIENT_SECRET: 'your-client-secret',
       MACHINE_AUDIENCE: 'edfiadminapp-api'
     },
     SAMPLE_OIDC_CONFIG: {
      issuer: 'https://your-keycloak-server/auth/realms/edfi',
      clientId: 'edfiadminapp',
      clientSecret: 'your-client-secret',
      scope: '',
     },
     //this should match with a user in your Idp
     ADMIN_USERNAME: 'admin@example.com',
     DB_ENCRYPTION_SECRET_VALUE: {
       KEY: 'your-32-char-encryption-key-here'
     },
     FE_URL: 'https://your-domain.com/adminapp',
     MY_URL: 'https://your-domain.com/adminapp-api',
     API_PORT: 3333
   };
   EOF
   ```

   :::tip
   `your-32-char-encryption-key-here` Can be replaced with `openssl rand -hex 32` or `node -e "console.log('KEY: '+ require('crypto').randomBytes(32).toString('hex'))"`
   :::

4. **Create systemd service**:

   ```bash
   sudo cat > /etc/systemd/system/edfiadminapp-api.service << 'EOF'
   [Unit]
   Description=Ed-Fi Admin App API
   After=network.target postgresql.service
   Wants=postgresql.service

   [Service]
   Type=simple
   User=edfiadminapp
   Group=edfiadminapp
   WorkingDirectory=/opt/edfiadminapp
   ExecStart=/usr/bin/node dist/packages/api/main.js
   Restart=always
   RestartSec=10
   Environment=NODE_ENV=production

   # Security settings
   NoNewPrivileges=true
   PrivateTmp=true
   ProtectSystem=strict
   ProtectHome=true
   ReadWritePaths=/opt/edfiadminapp/logs

   [Install]
   WantedBy=multi-user.target
   EOF

   sudo systemctl daemon-reload
   sudo systemctl enable edfiadminapp-api
   sudo systemctl start edfiadminapp-api
   ```

## Frontend Installation with NGiNX

1. **Build frontend**:

   ```bash
   sudo -u edfiadminapp npm run build:fe
   ```

2. **Configure NGiNX**:

   ```bash
   sudo cat > /etc/nginx/sites-available/edfiadminapp << 'EOF'
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name your-domain.com;

       ssl_certificate /path/to/your/certificate.crt;
       ssl_certificate_key /path/to/your/private.key;
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
       ssl_prefer_server_ciphers off;

       # Frontend application
       location /adminapp/ {
           alias /opt/edfiadminapp/dist/packages/fe/;
           try_files $uri $uri/ /adminapp/index.html;

           # Cache static assets
           location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
               expires 1y;
               add_header Cache-Control "public, immutable";
           }
       }

       # Backend API
       location /adminapp-api/ {
           proxy_pass http://localhost:3333/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
           proxy_read_timeout 86400;
       }
   }
   EOF

   sudo ln -s /etc/nginx/sites-available/edfiadminapp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Next Steps

Once the service and NGiNX are running, review the [Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md) page for backend, frontend, and database configuration details, and the [Security Considerations](../configuration/security-considerations.md) page before going to production. Then continue with [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md) and [Global Administration Tasks](../configuration/global-administration-tasks.md).
