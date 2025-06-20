import React, { useState } from 'react';
import axios from 'axios';

const InterviewPage = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [company, setCompany] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!resumeFile || !company) {
      alert("Please upload a resume and enter a company name.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload Resume
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('company', company);

      const uploadRes = await axios.post('http://localhost:5000/upload', formData);
      const { text: resumeText, resumeId } = uploadRes.data;

      // Step 2: Generate Questions
      const aiRes = await axios.post('http://localhost:5000/ai/interview-questions', {
        resumeText,
        company,
        resumeId,
      });

      setQuestions(aiRes.data.questions);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while processing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Interviewer</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResumeFile(e.target.files[0])}
        className="mb-4 block"
      />
      <input
        type="text"
        placeholder="Enter target company (e.g., Google)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Processing...' : 'Start Interview'}
      </button>

      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">AI Generated Questions:</h2>
          <ul className="list-disc list-inside space-y-2">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
