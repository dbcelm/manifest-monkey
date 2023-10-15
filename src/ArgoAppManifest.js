import React, { useState } from "react";

function ArgoAppManifest() {
  const [awsAccount, setAwsAccount] = useState("");
  const [tenantCode, setTenantCode] = useState("");
  const [appCode, setAppCode] = useState("");
  const [purposeCode, setPurposeCode] = useState("");
  const [appFullName, setAppFullName] = useState("");
  const [envShort, setEnvShort] = useState("");
  const [argoEnv, setArgoEnv] = useState("");
  const [repoName, setRepoName] = useState("");
  const [repoBranch, setRepoBranch] = useState("");
  const [helmChartName, setHelmChartName] = useState("");
  const [output, setOutput] = useState("");
  const [valuesFile, setValuesFile] = useState("");
  const [eksClusterName, setEKSClusterName] = useState("");
  const [namespace, setNamespace] = useState("");

  // Dropdown options
  const envShortOptions = ["d", "s", "u", "q", "p", "m"];
  const argoEnvOptions = ["prod", "nonprod"];

  const handleSubmit = (e) => {
    e.preventDefault();
    setOutput(`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: aws-${awsAccount}-use1-${envShort}-argoapp-${tenantCode}-${appCode}-${purposeCode}
  namespace: argocd
  labels:
    name: aws-${awsAccount}-use1-${envShort}-argoapp-${tenantCode}-${appCode}-${purposeCode}
spec:
  project: aws-${argoEnv}-argoproj-${appFullName}
  source:
    repoURL: git@bitbucket.org:${repoName}.git
    targetRevision: ${repoBranch}
    path: ${helmChartName}
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
    - Validate=false
    - CreateNamespace=true
    - PrunePropagationPolicy=foreground
    - PruneLast=true
  helm:
    releaseName: ${helmChartName}
    valueFiles:
    - ${valuesFile}
    skipCrds: false
    version: v3
  destination:
    name: ${eksClusterName}
    namespace: ${namespace}
  retry:
    limit: 3
    backoff:
      duration: 5s
      factor: 2
      maxDuration: 3m
  revisionHistoryLimit: 5`);

  };

  const handleCopy = (e) => {
    const copyText = document.getElementById("output");
    copyText.select();
    document.execCommand("copy");
  };

  return (
    <div className="container">
      <h1>Generate Argo Application Manifest</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="argoEnv">Argo Env:</label>
          <select
            id="argoEnv"
            value={argoEnv}
            onChange={(e) => setArgoEnv(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Select an option</option>
            {argoEnvOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
        <div className="form-group">
          <label htmlFor="repoBranch">Repo Branch:</label>
          <input
            type="text"
            id="repoBranch"
            value={repoBranch}
            onChange={(e) => setRepoBranch(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tenantCode">Tenant Code:</label>
          <input
            type="text"
            id="tenantCode"
            value={tenantCode}
            onChange={(e) => setTenantCode(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appCode">App Code:</label>
          <input
            type="text"
            id="appCode"
            value={appCode}
            onChange={(e) => setAppCode(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="purposeCode">Purpose Code:</label>
          <input
            type="text"
            id="purposeCode"
            value={purposeCode}
            onChange={(e) => setPurposeCode(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="awsAccount">AWS Account Alias:</label>
          <input
            type="text"
            id="awsAccount"
            value={awsAccount}
            onChange={(e) => setAwsAccount(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="envShort">Environment Short:</label>
          <select
            id="envShort"
            value={envShort}
            onChange={(e) => setEnvShort(e.target.value)}
            className="form-control"
            required
          >
            <option value="">Select an option</option>
            {envShortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="helmChartName">Helm Chart Name:</label>
          <input
            type="text"
            id="helmChartName"
            value={helmChartName}
            onChange={(e) => setHelmChartName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valuesFile">Values File Name:</label>
          <input
            type="text"
            id="valuesFile"
            value={valuesFile}
            onChange={(e) => setValuesFile(e.target.value)}
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

export default ArgoAppManifest;