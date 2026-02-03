# Maintenance

## Log Locations

- **API Logs**: `/opt/edfiadminapp/logs/` (Linux) or `logs/` (Docker)
- **Web Server Logs**: `/var/log/nginx/` (NGiNX) or IIS logs (Windows)
- **Database Logs**: `/var/log/postgresql/` (Linux)
- **System Logs**: `journalctl` (systemd) or Event Viewer (Windows)

## Health Checks

The application provides health check endpoints:

- **API Health**: `GET /api/healthcheck`
- **Frontend Health**: `GET /health` (when using NGiNX configuration)

## Regular Maintenance Tasks

1. **Database Maintenance**:

   ```sql
   -- Regular vacuum and analyze
   VACUUM ANALYZE;
   
   -- Check for bloat
   SELECT schemaname, tablename, attname, n_distinct, most_common_vals 
   FROM pg_stats WHERE tablename = 'your_table';
   ```

2. **Log Rotation**:

   ```bash
   # Configure logrotate for application logs
   sudo cat > /etc/logrotate.d/edfiadminapp << 'EOF'
   /opt/edfiadminapp/logs/*.log {
       daily
       rotate 30
       compress
       delaycompress
       missingok
       notifempty
       copytruncate
   }
   EOF
   ```

3. **Backup Strategy**:

   ```bash
   # Database backup script
   #!/bin/bash
   BACKUP_DIR="/backup/edfiadminapp"
   DATE=$(date +%Y%m%d_%H%M%S)
   
   mkdir -p $BACKUP_DIR
   pg_dump -h localhost -U edfiadminapp sbaa | gzip > $BACKUP_DIR/sbaa_$DATE.sql.gz
   
   # Keep only 30 days of backups
   find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
   ```

## Updates and Upgrades

1. **Application Updates**:

   ```bash
   # Stop services
   sudo systemctl stop edfiadminapp-api
   
   # Backup current installation
   sudo cp -r /opt/edfiadminapp /opt/edfiadminapp.backup
   
   # Update code
   cd /opt/edfiadminapp
   git pull origin main
   npm ci
   npm run build:api
   npm run build:fe
   
   # Run migrations
   npm run migrations:run
   
   # Restart services
   sudo systemctl start edfiadminapp-api
   sudo systemctl reload nginx
   ```

2. **Database Updates**:
   - Always backup before schema changes
   - Test migrations in staging environment first
   - Monitor application logs after updates

3. **Security Updates**:
   - Regular OS security updates
   - Keep Node.js and dependencies updated
   - Monitor security advisories

## Monitoring

Implement monitoring for:

- **Application health**: API and database connectivity
- **Performance metrics**: Response times, memory usage
- **Security events**: Failed authentication attempts
- **Resource utilization**: CPU, memory, disk space
- **Database performance**: Query performance, connection counts

Consider using tools like:

- **Prometheus + Grafana**: For metrics and dashboards
- **ELK Stack**: For log aggregation and analysis
- **Nagios/Zabbix**: For infrastructure monitoring
