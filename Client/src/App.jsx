import React, { useState } from 'react';
import axios from 'axios';

const InterviewPage = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [company, setCompany] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const handleUpload = async () => {
    if (!resumeFile || !company) {
      alert("Please upload a resume and enter a company name.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('company', company);

      const uploadRes = await axios.post('http://localhost:5000/upload', formData);
      const { text: resumeText, resumeId } = uploadRes.data;

      const aiRes = await axios.post('http://localhost:5000/ai/interview-questions', {
        resumeText,
        company,
        resumeId,
      });

      const qList = aiRes.data.questions;
      setQuestions(qList);
      setCurrentIndex(0);
      speak(qList[0]); // Start with the first question
    } catch (err) {
      console.error(err);
      alert("Something went wrong while processing.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      speak(questions[nextIndex]);
    } else {
      speak("Interview complete. Thank you!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎤 Voice Interview Mode</h1>

      {!questions.length && (
        <>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="mb-4 block"
          />
          <input
            type="text"
            placeholder="Enter target company"
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
        </>
      )}

      {questions.length > 0 && (
        <div className="mt-6 text-lg">
          <div className="mb-4 p-4 border rounded shadow">
            <strong>Q{currentIndex + 1}:</strong> {questions[currentIndex]}
          </div>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
