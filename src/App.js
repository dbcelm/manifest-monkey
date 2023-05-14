import { useState } from "react";
import "./App.css";

function App() {
  const [awsAccount, setAwsAccount] = useState("");
  const [tenantCode, setTenantCode] = useState("");
  const [appCode, setAppCode] = useState("");
  const [purposeCode, setPurposeCode] = useState("");
  const [appFullName, setAppFullName] = useState("");
  const [envShort, setEnvShort] = useState("");
  const [argoEnv, setArgoEnv] = useState("");
  const [argoIamRole, setArgoIamRole] = useState("");
  const [eksApiEndpoint, setEksApiEndpoint] = useState("");
  const [eksCaData, setEksCaData] = useState("");
  const [accountId, setAccountId] = useState("");
  const [repoName, setRepoName] = useState("");
  const [repoBranch, setRepoBranch] = useState("");
  const [helmChartName, setHelmChartName] = useState("");
  const [valuesFile, setValuesFile] = useState("");
  const [eksClusterName, setEKSClusterName] = useState("");
  const [namespace, setNamespace] = useState("");

  const generateAppManifest = () => {
    const manifest = `apiVersion: argoproj.io/v1alpha1
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

    helm:
      releaseName: ${helmChartName}

      valueFiles:
      - ${valuesFile}

      skipCrds: false
      version: v3

  destination:
    name: ${eksClusterName}
    namespace: ${namespace}

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

    retry:
      limit: 3
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m

  revisionHistoryLimit: 5`;

    navigator.clipboard.writeText(manifest);
    alert("Manifest copied to clipboard!");
  };

  const generateClusterManifest = () => {
    const manifest = `
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
}
`;

    navigator.clipboard.writeText(manifest);
    alert("Manifest copied to clipboard!");
  };

  const generateArgoProject = () => {
    const manifest = `apiVersion: argoproj.io/v1alpha1
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
    - 'git@bitbucket.org:${repoName}.git'`;

    navigator.clipboard.writeText(manifest);
    alert("Manifest copied to clipboard!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Argo Manifest Generator</h1>
        <p>
          <a href="#generate-form" targat="_blank">Generate Argo App Manifest</a>
        </p>
        <p>
          <a href="#generate-cluster-form" targat="_blank">Generate Cluster Manifest</a>
        </p>
        <p>
          <a href="#generate-project-form" targat="_blank">Generate Argo Project</a>
        </p>
      </header>
      <div className="Form-container" id="generate-form">
        <h2>Generate Argo App Manifest</h2>
        <label htmlFor="awsAccount">AWS Account Alias:</label>
        <input
          type="text"
          id="awsAccount"
          name="awsAccount"
          onChange={(e) => setAwsAccount(e.target.value)}
          required
        />
        <br />
        <label htmlFor="tenantCode">Tenant Code:</label>
        <input
          type="text"
          id="tenantCode"
          name="tenantCode"
          onChange={(e) => setTenantCode(e.target.value)}
          required
        />
        <br />
        <label htmlFor="appCode">App Code:</label>
        <input
          type="text"
          id="appCode"
          name="appCode"
          onChange={(e) => setAppCode(e.target.value)}
          required
        />
        <br />
        <label htmlFor="purposeCode">Purpose Code:</label>
        <input
          type="text"
          id="purposeCode"
          name="purposeCode"
          onChange={(e) => setPurposeCode(e.target.value)}
          required
        />
        <br />
        <label htmlFor="appFullName">Application Full Name:</label>
        <input
          type="text"
          id="appFullName"
          name="appFullName"
          onChange={(e) => setAppFullName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="envShort">Environment Short Value:</label>
        <input
          type="text"
          id="envShort"
          name="envShort"
          onChange={(e) => setEnvShort(e.target.value)}
          required
        />
        <br />
        <label htmlFor="argoEnv">Argo Environment:</label>
        <input
          type="text"
          id="argoEnv"
          name="argoEnv"
          onChange={(e) => setArgoEnv(e.target.value)}
          required
        />
        <br />
        <label htmlFor="argoIamRole">Argo IAM Role:</label>
        <input
          type="text"
          id="argoIamRole"
          name="argoIamRole"
          onChange={(e) => setArgoIamRole(e.target.value)}
          required
        />
        <br />
        <label htmlFor="eksApiEndpoint">EKS API Endpoint:</label>
        <input
          type="text"
          id="eksApiEndpoint"
          name="eksApiEndpoint"
          onChange={(e) => setEksApiEndpoint(e.target.value)}
          required
        />
        <br />
        <label htmlFor="eksCaData">EKS CA Data:</label>
        <input
          type="text"
          id="eksCaData"
          name="eksCaData"
          onChange={(e) => setEksCaData(e.target.value)}
          required
        />
        <br />
        <label htmlFor="accountId">12 Digit AccountID:</label>
        <input
          type="text"
          id="accountId"
          name="accountId"
          onChange={(e) => setAccountId(e.target.value)}
          required
        />
        <br />
        <label htmlFor="repoName">Bitbucket Repo:</label>
        <input
          type="text"
          id="repoName"
          name="repoName"
          onChange={(e) => setRepoName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="repoBranch">Bitbucket Branch:</label>
        <input
          type="text"
          id="repoBranch"
          name="repoBranch"
          onChange={(e) => setRepoBranch(e.target.value)}
          required
        />
        <br />
        <label htmlFor="helmChartName">Helm Chart Name:</label>
        <input
          type="text"
          id="helmChartName"
          name="helmChartName"
          onChange={(e) => setHelmChartName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="valuesFile">Values File Name:</label>
        <input
          type="text"
          id="valuesFile"
          name="valuesFile"
          onChange={(e) => setValuesFile(e.target.value)}
          required
        />
        <br />
        <label htmlFor="eksClusterName">EKS Cluster Name:</label>
        <input
          type="text"
          id="eksClusterName"
          name="eksClusterName"
          onChange={(e) => setEKSClusterName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="namespace">Namespace:</label>
        <input
          type="text"
          id="namespace"
          name="namespace"
          onChange={(e) => setNamespace(e.target.value)}
          required
        />
        <br />
        <button onClick={generateAppManifest}>Generate Manifest</button>
        <br />
        <textarea id="manifestOutput" readOnly value={generateAppManifest} />
      </div>
      <div className="Form-container" id="generate-cluster-form">
        <h2>Generate Cluster Manifest</h2>
        <button onClick={generateClusterManifest}>Generate Manifest</button>
        <br />
        <textarea id="clusterManifestOutput" readOnly value={generateClusterManifest} />
      </div>
      <div className="Form-container" id="generate-project-form">
        <h2>Generate Argo Project</h2>
        <button onClick={generateArgoProject}>Generate Manifest</button>
        <br />
        <textarea id="projectManifestOutput" readOnly value={generateArgoProject} />
      </div>
    </div>
  );
}

export default App;