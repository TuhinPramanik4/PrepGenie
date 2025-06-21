import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CivicAuthProvider } from '@civic/auth/react';

import LandingPage from './page';
import Dashboard from './dashboard/page';
import InterviewPage from './Interview/page';
import AIInterviewPage from './ai-interview/page';
import InterviewResultsPage from './Interview-results/page';

// function AuthWrapper({ children }) {
// const { user } = useCivicAuth(); // gets user info when authenticated
// const navigate = useNavigate();

// useEffect(() => {
// if (user) {
// navigate("/dashboard"); // redirect after successful authentication
// }
// }, [user, navigate]);

// return children;
// }

function App() {
      const navigate = useNavigate();
 return (
 <CivicAuthProvider 
              clientId="4fd94ee1-c831-4252-beed-d0c4c29d1e88"
              displayMode="iframe"
              onSignIn={(error) => {
                if (error) {
                  console.error("Sign in error:", error);
                } else {
                  console.log("Sign in successful");
                   navigate('/dashboard')
                }
              }}
            >
 <Routes>
 <Route path="/" element={<LandingPage />} />
 <Route path="/dashboard" element={<Dashboard />} />
 {/* <Route path="/dashboard" element={<Dashboard redirectUrl={redirectUrl} />} /> */}
  <Route path="/interview" element={<InterviewPage />} />
 <Route path="/ai-interview" element={<AIInterviewPage />} />
 <Route path="/interview-results" element={<InterviewResultsPage />} />
 </Routes>
 </CivicAuthProvider>
 );
}

export default App;

