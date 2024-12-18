# **How to: Add a `postgres` Role on a custom-configured PostgreSQL Server**

In environments where PostgreSQL server was setup with a custom superuser instead of the default `postgres`, the Ed-Fi ODS / API database templates will fail to be restored because they require a `postgres` user or a user with a `postgres` role to exist.
For these scenarios, a `postgres` role can be created and assigned to the user executing the restore. This example will show how to add such role without login capabilities and assign to the custom superuser.

## **Prerequisites**

Ensure you have:

1. **Custom Superuser Credentials** – The username and password for the custom superuser.
2. **Access to the PostgreSQL Server** – Via the `psql` command-line tool or a PostgreSQL client like `pgAdmin`.

## **Steps to Create a `postgres` Role**

### **1. Connect to the PostgreSQL Server**

Connect to your PostgreSQL server using the custom superuser account:

```bash
psql -U <custom_superuser> -h <host> -d <database_name>
```

Enter the password for `<custom_superuser>` when prompted.

### **2. Create the `postgres` Role**

Run the following SQL command to create a `postgres` role without login capability:

```sql
CREATE ROLE postgres WITH NOLOGIN INHERIT;
```

### **3. Assign the `postgres` Role to custom superuser**

Assign the role to the custom superuser (or the user you created for the EdFi ODS /API database):

```sql
GRANT <custom_superuser> TO postgres;
```
