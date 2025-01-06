# Why ETL and ELT Practices Do Not Solve Interoperability Problems

Extract-transform-load (ETL) and extract-load-transform (ELT) are common industry practices for the movement of data between IT systems. Robust ETL tooling has been available for several decades, and the experience of using that tooling over time has revealed that the limitations of using ETL/ELT to solve interoperability issues.

These approaches work a bit like fixing a broken water pipe with duct tape: you can – within a very short time frame – achieve results that deliver value and solve immediate data problems. But as with fixing a pipe with duct tape, the solution is fragile and will over time require much attention. Over the long term, agencies that commit to large numbers of ETL/ELT solutions experience large overhead in maintenance.

Critically, these connections can also elevate security risks; just as with the duct tape analogy, they increase the risks of more widespread and serious problems.

### ETL/ELT approaches are most often less secure because they involve movement through and storage on more, often less secure, systems

ETL/ETL often involves moving data into intermediate locations that themselves need to be secured. Sometimes, these processes are run from other servers or even from staff laptops. The movement through or storage of data on multiple systems increases the risks of data compromise.

In a system-to-system API-based approach data does not move into intermediate locations and is not stored elsewhere. This minimizes the surface that is open to attack or accidental exposure.

### ETL/ELT approaches are most often less secure because they use technologies not designed for cross-organizational data exchange

ETL/ELT approaches often involve “tunnelling” or bypassing standardized security firewalls and interfaces that protect IT systems. Commonly you see VPN setups that allow for more systems to join a protected network, or a “tunnel” that allows a system to breach a firewall in order to connect to an internal system.

By contrast, REST API connections are built using the language and protocols of the Web itself, protocols like HTTP/S, SSL, and OAuth. These protocols were built from the ground up to handle connections between disparate systems across different organizations, and they are tightly integrated with each other.

### ETL/ELT approaches are more fragile because they integrate at the storage layer rather than the application layer

Modern software development best practice promotes component modeling that mirrors entities and processes in the real world. This “application” layer is the level at which system integration ideally occurs, because at that level you are dealing with data entities that represent real-world concepts.

However, ETL/ELT approaches are often based on connections at the database or data storage level; that layer is a downstream, derivative artifact of software application development. Database tables are often unclearly named, undocumented and subject to change. Said another way: the database is not intended as a standardized interface to the product, so using it as an interface – as ETL/ELT processes tend to do – results in frequent issues, especially across software releases for the product.

### ETL/ELT approaches do not increase vendor responsibility

Building off the above point, integration at the database layer rather than via a defined product interface (like an API) frees the product vendor of responsibility for ensuring that data that leaves their product is correct.

In an API-based approach, the API is a first-class product feature owned by the vendor. The vendor considers the ongoing proper functioning of that feature across new product releases and also works to ensure that these features are reflected in related processes like documentation, training and support.
