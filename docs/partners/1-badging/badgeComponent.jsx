// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Details from '@theme/Details';

export default ({ badges }) => {
  function productInformationLink(badge) {
    if (badge.productInformation) {
      return (
        <p>
          <a href={badge.productInformation}>product information</a>
        </p>
      );
    }

    if (badge.website) {
      return (
        <p>
          <a href={badge.website}>product information</a>
        </p>
      );
    }

    return null;
  }

  function constructLink(href, text) {
    if (href.includes('@')) {
      return <a href={'mailto:' + href}>{text}</a>;
    }

    return <a href={href}>{text}</a>;
  }

  function documentation(badge) {
    if (!badge.documentation) return null;

    if (
      typeof badge.documentation === 'string' ||
      badge.documentation instanceof String
    ) {
      return (
        <tr>
          <th>Documentation</th>
          <td>{badge.documentation}</td>
        </tr>
      );
    }

    const items = Object.entries(badge.documentation).map(([key, value]) => (
      <p key={key}>{constructLink(value, key)}</p>
    ));

    return (
      <tr>
        <th>Documentation</th>
        <td>{items}</td>
      </tr>
    );
  }

  function services(badge) {
    if (!badge.servicesPerformed) return null;

    let description = '';
    if (badge.servicesPerformed.description) {
      description = <p> {badge.servicesPerformed.description} </p>;
    }

    return (
      <tr>
        <th>Services Performed</th>
        <td>
          <a href={badge.servicesPerformed.link}>
            {badge.organization}
          </a>
          {description}
        </td>
      </tr>
    );
  }

  function versions(badge) {
    if (!badge.versionCompatibility) return null;

    return (
      <tr>
        <th>Version Compatibility</th>
        <td>{(badge.versionCompatibility || []).join(', ')}</td>
      </tr>
    );
  }

  function availability(badge) {
    if (!badge.availability) return null;

    return (
      <tr>
        <th>Product Availability</th>
        <td>{badge.availability}</td>
      </tr>
    );
  }

  return (
    <div className="container table">
      <div className="row row--thead">
        <div className="col col--2 col--th">Product</div>
        <div className="col col--2 col--th">Valid Through</div>
        <div className="col col--8 col--th">Badge Details</div>
      </div>
      {badges.map((badge, index) => (
        <div
          className={'row col--tr' + (index % 2 == 1 ? '-alt' : '')}
          key={index}
        >
          <div className="col col--2 col--td">
            <p>
              <a href={badge.website}>
                <img
                  src={badge.logo}
                  alt={badge.productName}
                  title={badge.productName}
                  style={{ height: 'auto', width: '100%', maxWidth: '200px' }}
                />
              </a>
            </p>
            {productInformationLink(badge)}
          </div>
          <div className="col col--2 col--td">{badge.validThrough}</div>
          <div className="col col--8 col--td">
            <Details summary="Expand for additional details...">
              <table>
                <tbody>
                  <tr>
                    <th>Verifying Agencies</th>
                    <td>{(badge.verifyingAgencies || []).join(', ')}</td>
                  </tr>
                  {versions(badge)}
                  {availability(badge)}
                  {documentation(badge)}
                  {services(badge)}
                </tbody>
              </table>
            </Details>
          </div>
        </div>
      ))}
    </div>
  );
};
