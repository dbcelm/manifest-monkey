import React from 'react';
import { Route, Switch } from 'wouter';
import './App.css';

import LandingPage from './LandingPage';
import ArgoAppManifest from './ArgoAppManifest';
import ClusterManifest from './ClusterManifest';
import ArgoProject from './ArgoProject';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/argo-app-manifest" component={ArgoAppManifest} />
        <Route path="/cluster-manifest" component={ClusterManifest} />
        <Route path="/argo-project" component={ArgoProject} />
      </Switch>
    </div>
  );
}

export default App;
