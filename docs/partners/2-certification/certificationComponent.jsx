// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Details from '@theme/Details';

export default ({ certifications }) => {
  return (
    <div className="container table">
      <div className="row row--thead">
        <div className="col col--2 col--th">Product</div>
        <div className="col col--2 col--th">Valid Through</div>
        <div className="col col--8 col--th">Certification Details</div>
      </div>
      {certifications.map((cert, index) => (
        <div
          className={'row col--tr' + (index % 2 == 1 ? '-alt' : '')}
          key={index}
        >
          <div className="col col--2 col--td">
            <p>
              <a href={cert.website}>
                <img
                  src={cert.logo}
                  alt={cert.productName}
                  title={cert.productName}
                  style={{ height: 'auto', width: '100%', maxWidth: '200px' }}
                />
              </a>
            </p>
            <p>
              <a href={cert.website}>{cert.productName}</a>
            </p>
          </div>
          <div className="col col--2 col--td">{cert.validThrough}</div>
          <div className="col col--8 col--td">
            <Details summary="Expand for additional details...">
              <table>
                <tbody>
                  <tr>
                    <th>Verifying Agencies</th>
                    <td>{cert.verifyingAgencies.join(', ')}</td>
                  </tr>
                  <tr>
                    <th>Version Compatibility</th>
                    <td>{cert.versionCompatibility}</td>
                  </tr>
                  <tr>
                    <th>Certified Product Availability</th>
                    <td>{cert.availability}</td>
                  </tr>
                  <tr>
                    <th>Required Documentation</th>
                    <td>
                      <ul>
                        {Object.entries(cert.documentation).map(
                          ([key, value]) => (
                            <li key={key}>
                              <a href={value}>{key}</a>
                            </li>
                          ),
                        )}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th>Notes &amp; Support Resources</th>
                    <td>
                      <ul>
                        {cert.supportResources.map((resource, i) => (
                          <li key={i}>
                            <a href={resource.link}>{resource.name}</a>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Details>
          </div>
        </div>
      ))}
    </div>
  );
};
