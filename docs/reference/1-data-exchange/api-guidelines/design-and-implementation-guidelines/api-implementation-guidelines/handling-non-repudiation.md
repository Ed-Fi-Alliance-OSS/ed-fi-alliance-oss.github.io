# Handling Non-Repudiation

Where data security is important, an action performed by a user must have an
authentication that can be assured to be genuine with a high degree of
confidence. This is known as non-repudiation. Once a security environment has
been established, operational logs consisting of (minimally) the user,
application, resource, operation, and date/time information should be maintained
to establish a basis for non-repudiation within an Ed-Fi REST API
implementation. These logs should be audited on a regular basis.

When all REST API actions are secure and logged, the user purported to have
performed an action must actually have done it. Without appropriate security or
logging, it cannot be guaranteed that a specific user actually performed an
action on the system.
