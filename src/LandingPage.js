import React from 'react';

function LandingPage() {
  return (
    <div className="container">
      <h1>Argo Manifest Generator</h1>
      <div className="landing-links">
        <a href="#generate-form" target="_blank">Generate Argo App Manifest</a>
        <a href="#generate-cluster-form" target="_blank">Generate Cluster Manifest</a>
        <a href="#generate-project-form" target="_blank">Generate Argo Project</a>
      </div>
    </div>
  );
}

export default LandingPage;