// import React from 'react';
// import { Link } from 'wouter';
// import './LandingPage.css';

// function LandingPage() {
//   return (
//     <div className="container">
//       <h1 className="title">Manifest Monkey</h1>
//       <div className="landing-links">
//         <Link className="link" href="/argo-app-manifest">Argo App Manifest</Link>
//         <Link className="link" href="/cluster-manifest">Cluster Manifest</Link>
//         <Link className="link" href="/argo-project">Argo Project Manifest</Link>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
// import React from 'react';
// import { Link } from 'wouter';
// import './LandingPage.css';

// function LandingPage() {
//   return (
//     <div className="container">
//       <h1 className="title animated-title">Manifest Monkey</h1>
//       <div className="landing-links">
//         <Link className="link" href="/argo-app-manifest">Argo App Manifest</Link>
//         <Link className="link" href="/cluster-manifest">Cluster Manifest</Link>
//         <Link className="link" href="/argo-project">Argo Project Manifest</Link>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

import React, { useState } from 'react';
import { Link } from 'wouter';
import './LandingPage.css';
import ArgoAppManifest from './ArgoAppManifest';
import ClusterManifest from './ClusterManifest';
import ArgoProject from './ArgoProject';

function LandingPage() {
  const [selectedManifestType, setSelectedManifestType] = useState('');
  const [formData, setFormData] = useState({
    // Initialize form data fields with empty values
    // Add all necessary fields for each type of manifest
    argoEnv: '',
    appFullName: '',
    eksClusterName: '',
    namespace: '',
    repoName: '',
    argoIamRole: '',
    eksApiEndpoint: '',
    eksCaData: '',
    accountId: '',
    argoAppAwsAccount: '',
    tenantCode: '',
    appCode: '',
    purposeCode: '',
    envShort: '',
    helmChartName: '',
    valuesFile: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <h1 className="title animated-title">Manifest Monkey</h1>
      <div className="landing-links">
        <div className="manifest-type-selector">
          <label>Select Manifest Type:</label>
          <select
            value={selectedManifestType}
            onChange={(e) => setSelectedManifestType(e.target.value)}
          >
            <option value="">Select a Manifest Type</option>
            <option value="argoApp">Argo Application Manifest</option>
            <option value="clusterManifest">Cluster Manifest</option>
            <option value="argoProject">Argo Project Manifest</option>
          </select>
        </div>
        {selectedManifestType === 'argoApp' && (
          <ArgoAppManifest formData={formData} handleInputChange={handleInputChange} />
        )}
        {selectedManifestType === 'clusterManifest' && (
          <ClusterManifest formData={formData} handleInputChange={handleInputChange} />
        )}
        {selectedManifestType === 'argoProject' && (
          <ArgoProject formData={formData} handleInputChange={handleInputChange} />
        )}
      </div>
    </div>
  );
}

export default LandingPage;
