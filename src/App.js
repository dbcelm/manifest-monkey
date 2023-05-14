import React from 'react';
import LandingPage from './LandingPage';
import ArgoAppManifest from './ArgoAppManifest';
import ClusterManifest from './ClusterManifest';
import ArgoProject from './ArgoProject';
import './App.css';

function App() {
  return (
    <div>
      <LandingPage />
      <ArgoAppManifest />
      <ClusterManifest />
      <ArgoProject />
    </div>
  );
}

export default App;