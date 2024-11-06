# Preparing for Certification

This section provides advice on preparing for certification.

## Pilot with Real Users

Above all, the Ed-Fi Alliance strongly recommends piloting with actual schools
as you build your API. Certification is not a precise proxy for what your
product users will value most from the integration. As you build, you will face
many questions, such as:

* Will users understand when and how data is moving between systems?
* What data should I map and provide first – what would be most valuable?
* Would it be best to put the button here or over there? Is this description
  comprehensible?
* How do I surface errors to users so they can understand them?

The best way to answer these questions is to build your integration
functionality in collaboration with your actual users or customers.

Certification is not your end goal: your end goal is to help teachers, students,
and other classroom stakeholders get the data they need to make the best
possible decisions. Develop for success first, certify second.

## Review the Implementation Playbook

In planning your API implementation, the Alliance has published a set of
training materials and best practice, the [Data Providers - Implementation
Playbook](/getting-started/provider-playbook).
We strongly suggest that data providers planning or building integrations review
that material as early as possible in their project.

## Set up a Test Environment

If you don't have an API provided to you, you can set up the Ed-Fi ODS and API
to get a local implementation of Assessment APIs to test against. Consult
the [Ed-Fi ODS / API documentation](/reference/ods-api) for more information on
using the Ed-Fi ODS / API to set up a testing sandbox. There are also
cloud-based installers available in the [Ed-Fi
Exchange](http://exchange.ed-fi.org).

By default, the testing employs references from the "populated" sandbox (also
known as the "Grand Bend" data set). We recommend that providers build their
sample cases off of the students and schools referenced in that data set.
