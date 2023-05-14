import React, { useState } from "react";

function ArgoProject() {
  const [argoEnv, setArgoEnv] = useState("");
  const [appFullName, setAppFullName] = useState("");
  const [eksClusterName, setEKSClusterName] = useState("");
  const [namespace, setNamespace] = useState("");
  const [repoName, setRepoName] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setOutput(`apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
    name: aws-${argoEnv}-argoproj-${appFullName}
    namespace: argocd
spec:
    clusterResourceWhitelist:
    - group: '*'
        kind: '*'
    description: Argocd project for ${appFullName}
    destinations:
    - name: ${eksClusterName}
        namespace: ${namespace}
    namespaceResourceWhitelist:
    - group: '*'
        kind: '*'
    sourceRepos:
    - 'git@bitbucket.org:${repoName}.git'`);
  };

  const handleCopy = (e) => {
    const copyText = document.getElementById("output");
    copyText.select();
    document.execCommand("copy");
  };

  return (
    <div className="container">
      <h1>Generate Argo Project Manifest</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="argoEnv">Argo Env:</label>
          <input
            type="text"
            id="argoEnv"
            value={argoEnv}
            onChange={(e) => setArgoEnv(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appFullName">App Full Name:</label>
          <input
            type="text"
            id="appFullName"
            value={appFullName}
            onChange={(e) => setAppFullName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eksClusterName">EKS Cluster Name:</label>
          <input
            type="text"
            id="eksClusterName"
            value={eksClusterName}
            onChange={(e) => setEKSClusterName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="namespace">Namespace:</label>
          <input
            type="text"
            id="namespace"
            value={namespace}
            onChange={(e) => setNamespace(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="repoName">Repo Name:</label>
          <input
            type="text"
            id="repoName"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Generate Manifest
        </button>
      </form>
      {output && (
        <div className="output">
          <h3>Generated Manifest:</h3>
          <textarea id="output" value={output} rows="5" readOnly />
          <button className="btn btn-secondary" onClick={handleCopy}>
            Copy Manifest
          </button>
        </div>
      )}
    </div>
  );
}

export default ArgoProject;