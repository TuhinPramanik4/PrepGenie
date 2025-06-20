import React from 'react';
import { CivicAuthProvider } from '@civic/auth/react'; // Don't forget this import!
import InterviewPage from './Interview/page';
import AIInterviewPage from './ai-interview/page';
import Dashboard from './dashboard/page';
import InterviewResultsPage from './Interview-results/page';
import LandingPage from './page';

function App({ children }) {
  return (
    <CivicAuthProvider clientId="4fd94ee1-c831-4252-beed-d0c4c29d1e88">
      <>
        {children}
        <div>
          <LandingPage />
        </div>
      </>
    </CivicAuthProvider>
  );
}

export default App;
