# Yopass User Guide

## Introduction

Ed-Fi Admin App uses Yopass for securely sharing API credentials (client key and secret). This guide will help you understand what Yopass is and how to use the secure links provided by the Admin App.

## What is Yopass?

Yopass is a secure way to share sensitive information. It creates "self-destructing" links that can only be viewed once and automatically expire after a set time. This ensures that sensitive information like API credentials doesn't remain accessible indefinitely through email or chat logs.

## Why Secure Links?

When you create or reset API credentials in the Admin App, the system generates a client key and a secret. These credentials provide access to the Ed-Fi ODS/API, so they need to be handled securely. Instead of displaying these credentials directly in the browser or sending them via email, the Admin App generates a secure, one-time link using Yopass.

## How to Use Secure Credential Links

### Accessing API Credentials for the First Time

When creating a new API client or resetting credentials for an existing client, you will see a screen similar to this:

![Secure Link Screen](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/yopass/AdminApp-LinkToCredentials.png)

1. **Copy the secure link** by clicking the "Copy Link" button
2. **Share the link** with the intended recipient using your preferred communication method
3. Inform the recipient that the link:
   - Can only be viewed once
   - Will expire after 24 hours if not viewed
   - Contains sensitive information that should be stored securely

### Opening a Secure Link

When you receive a secure link:

1. Click on the link or paste it into your browser
2. The Yopass interface will appear
3. Click "Decrypt Secret" to view the credentials
4. The credentials will be displayed only once - after viewing, the secret is permanently deleted

![Yopass Secure Link](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/yopass/SecureLink-Look.png)

![Yopass Secure Link Open](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/yopass/LinkOpen.png)

![Yopass Secure Link Expired](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/yopass/CredentialsExpired.png)

### Saving Your Credentials

After viewing the credentials:

1. Record the credentials in a secure location, such as:
   - A password manager
   - An encrypted file
   - A secure note application
2. Never share these credentials via email, chat, or other insecure methods
3. Remember that once you close the window, you cannot access the same credentials again through the link

## Frequently Asked Questions

### Can I view the credentials more than once?

No. Yopass links can only be viewed once. This security feature ensures that the sensitive information isn't accessible after initial viewing.

### What happens if I don't view the link within 24 hours?

The link will expire, and the encrypted information will be permanently deleted. You'll need to request a new credential reset.

### Can I forward the link to someone else?

You can, but remember that whoever accesses the link first will be the only one who can view the information. Once viewed, the link becomes invalid for everyone else.

### Is the link transmission secure?

The link itself doesn't contain the actual credentials; it only contains a reference to where the encrypted data is stored. However, you should still treat the link as sensitive information and share it securely.

### Why does Admin App use this approach?

This approach provides significantly better security than displaying credentials directly in the browser or sending them via email, as it ensures that:

- Credentials aren't stored in browser history
- Credentials don't remain in email inboxes indefinitely
- Access is limited to a single viewing
- There's a built-in expiration mechanism
