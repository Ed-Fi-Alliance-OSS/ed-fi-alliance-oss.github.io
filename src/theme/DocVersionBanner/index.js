import React from 'react';
import DocVersionBanner from '@theme-original/DocVersionBanner';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import { useDocVersionSuggestions } from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';

export default function DocVersionBannerWrapper(props) {
  const versionMetadata = useDocsVersion();

  switch (versionMetadata.className) {
    case 'active':
      const getVersionMainDoc = (version) =>
        version.docs.find((doc) => doc.id === version.mainDocId);
      const { latestDocSuggestion, latestVersionSuggestion } =
        useDocVersionSuggestions(versionMetadata.pluginId);
      const latestVersionSuggestedDoc =
        latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);

      return (
        <>
          <div className="theme-doc-version-banner alert alert--warning margin-bottom--md">
            This is documentation for an older release that is still maintained.{' '}
            <Link to={latestVersionSuggestedDoc.path}>Latest version</Link>
          </div>
        </>
      );
    default:
      return (
        <>
          <DocVersionBanner {...props} />
        </>
      );
  }
}
