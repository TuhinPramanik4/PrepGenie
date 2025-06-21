import React from 'react';
import { CivicAuthProvider } from '@civic/auth/react'; // Don't forget this import!
import InterviewPage from './Interview/page';
import AIInterviewPage from './ai-interview/page';
import Dashboard from './dashboard/page';
import InterviewResultsPage from './Interview-results/page';
import LandingPage from './page';

function App({ children }) {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default App;
