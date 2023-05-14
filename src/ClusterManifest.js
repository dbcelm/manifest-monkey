import React, { useState } from "react";

function ClusterManifest() {
  const [argoIamRole, setArgoIamRole] = useState("");
  const [eksApiEndpoint, setEksApiEndpoint] = useState("");
  const [eksCaData, setEksCaData] = useState("");
  const [accountId, setAccountId] = useState("");
  const [eksClusterName, setEKSClusterName] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setOutput(`
resource "kubernetes_secret" "add_eks_cluster_${eksClusterName}" {
    provider = kubernetes.argocd-dev-eks
    metadata {
        name      = "${eksClusterName}"
        namespace = "argocd"
        labels = {
        "argocd.argoproj.io/secret-type" = "cluster"
        }
    }
    type = "Opaque"
    data = {
        name = "${eksClusterName}"
        server = "${eksApiEndpoint}"
        config = jsonencode({
        awsAuthConfig = {
            clusterName = "${eksClusterName}"
            roleARN = "arn:aws:iam::${accountId}:role/${argoIamRole}"
        }
        tlsClientConfig = {
            insecure = false
            caData = "${eksCaData}"
        }
        })
    }
    }`);
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
          <label htmlFor="argoIamRole">Argo IAM Role Name:</label>
          <input
            type="text"
            id="argoIamRole"
            value={argoIamRole}
            onChange={(e) => setArgoIamRole(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eksApiEndpoint">EKS API Endpoint:</label>
          <input
            type="text"
            id="eksApiEndpoint"
            value={eksApiEndpoint}
            onChange={(e) => setEksApiEndpoint(e.target.value)}
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
          <label htmlFor="eksCaData">EKS CA Data:</label>
          <input
            type="text"
            id="eksCaData"
            value={eksCaData}
            onChange={(e) => setEksCaData(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountId">AWS Account ID Full:</label>
          <input
            type="text"
            id="accountId"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
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

export default ClusterManifest;