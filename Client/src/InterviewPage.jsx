import React, { useState } from 'react';
import axios from 'axios';

const InterviewPage = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [company, setCompany] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeId, setResumeId] = useState(null);

  const speak = async (text) => {
    const response = await axios.post('http://localhost:5000/tts', { text }, { responseType: 'blob' });
    const audio = new Audio(URL.createObjectURL(response.data));
    audio.play();
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setUserAnswer(transcript);
      const aiRes = await axios.post('http://localhost:5000/ai/evaluate-answer', {
        question: questions[currentIndex],
        answer: transcript,
        resumeText,
        company
      });
      setFeedback(aiRes.data.feedback);
    };
    recognition.start();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('company', company);

    const uploadRes = await axios.post('http://localhost:5000/upload', formData);
    const { text, resumeId } = uploadRes.data;
    setResumeText(text);
    setResumeId(resumeId);

    const aiRes = await axios.post('http://localhost:5000/ai/interview-questions', {
      resumeText: text,
      company,
      resumeId
    });

    setQuestions(aiRes.data.questions);
    setCurrentIndex(0);
    speak(aiRes.data.questions[0]);
  };

  const handleNext = () => {
    setUserAnswer('');
    setFeedback('');
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      speak(questions[nextIndex]);
    } else {
      alert('Interview completed!');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎤 AI Voice Interview</h1>

      {!questions.length && (
        <>
          <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} />
          <input type="text" placeholder="Target company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <button onClick={handleUpload}>Start Interview</button>
        </>
      )}

      {questions.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl mb-2">Question {currentIndex + 1}:</h2>
          <p>{questions[currentIndex]}</p>

          <button onClick={startSpeechRecognition} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">🎙 Answer</button>

          {userAnswer && (
            <div className="mt-4">
              <p><strong>Your Answer:</strong> {userAnswer}</p>
              <p><strong>Feedback:</strong> {feedback}</p>
              <button onClick={handleNext} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
