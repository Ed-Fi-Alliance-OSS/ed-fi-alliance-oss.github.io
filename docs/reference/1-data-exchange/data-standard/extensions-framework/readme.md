# Ed-Fi Extension Framework

The Ed-Fi Data Standard and related technologies can be extended to add new
entities and elements. The set of standard extensions are codified in the Ed-Fi
Extension Framework, documented herein.

## Framework Reference Implementation

An implementation of the Ed-Fi Extension Framework is provided via the MetaEd
IDE. The Ed-Fi Community has relied heavily on this reference implementation and
downstream technology implementations (e.g., the API implementation in the Ed-Fi
ODS/API, etc.) to define patterns that have proven stable and are believed to be
widely implementable.

The Alliance and the Ed-Fi community welcome other Extension Framework
implementations to contribute their tools and knowledge to this effort.

## Extension Framework Categories

The Ed-Fi Extension Framework defines two categories of extension:

* **Supported Extensions.** Extensions to the Ed-Fi data model are only
    allowed if specifically enumerated in the Extension Framework.
  * Extensions in this category generally have implementation and
        documentation support in Ed-Fi technology such as the Ed-Fi ODS / API.
  * Supported extensions are documented
        [here](./supported-extensions.md).
* **Unsupported Extensions.** Extensions not in the Extension Framework are
    not allowed. The documentation attempts to enumerate the most common of
    those. The Extension Framework evolves over time, so there are some
    community input mechanisms in place to help the community explore new models
    that may be candidates for support.
  * Extension options under investigation. In some cases, the documentation
        on unsupported extensions may link to [Ed-Fi
        Tracker](http://tracker.ed-fi.org/) tickets discussing extension options
        and designs are candidates for support under the Extensions Framework.
        These tickets should not be interpreted to indicate that a feature is on
        the roadmap or "coming soon." We do invite interested parties to provide
        feedback on these tickets as to the utility of these features.
  * Common unsupported extension scenarios are described
        [here](./unsupported-modifications.md).
