# Handling Web Cache Validation with ETags

ETags _may_ be used to reduce bandwidth usage by preventing the contents of an
unmodified resource from being returned. An Ed-Fi REST API _should_ support such
cache validation through the use of the `If-None-Match` request header. If the
ETag value supplied in the request header still matches the existing resource,
the API _may_ respond with a 304 (Not Modified) status code with no response
body, rather than a 200 (OK) with the resource content.a
