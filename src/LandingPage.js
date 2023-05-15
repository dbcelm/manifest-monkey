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
import React from 'react';
import { Link } from 'wouter';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="container">
      <h1 className="title animated-title">Manifest Monkey</h1>
      <div className="landing-links">
        <Link className="link" href="/argo-app-manifest">Argo App Manifest</Link>
        <Link className="link" href="/cluster-manifest">Cluster Manifest</Link>
        <Link className="link" href="/argo-project">Argo Project Manifest</Link>
      </div>
    </div>
  );
}

export default LandingPage;