// routes/ai.js
const express = require('express');
const axios = require('axios');
const Interview = require('../models/Interview'); // ✅ Import model
const Response = require('../models/Response');


const router = express.Router();

router.post('/evaluate-answer', async (req, res) => {
  const { question, answer, company, resumeText, resumeId } = req.body;

  const prompt = `You are an AI interviewer.
Here is a candidate's answer to a question.
Question: ${question}
Answer: ${answer}
Resume context: ${resumeText}
Company: ${company}
Give 3 bullet points of feedback for improvement.`;

  try {
    const result = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );
    const feedback = result.data.candidates[0].content.parts[0].text;

    await Response.create({ resumeId, company, question, answer, feedback });

    res.json({ feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Feedback generation failed' });
  }
});


router.post('/interview-questions', async (req, res) => {
  const { resumeText, company, resumeId } = req.body;

  const prompt = `
You are an AI interviewer for ${company}.
Based on the candidate’s resume: ${resumeText}
Generate 5 technical interview questions relevant to the company style.
Only list questions, no answers or explanations.
  `;

  try {
    const result = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    const raw = result.data.candidates[0].content.parts[0].text;
    const questions = raw.split('\n').filter(q => q.trim() !== '');

    // Save to DB
    const interview = new Interview({
      // userId: '12345', // ← Optional
      resumeId,
      company,
      questions
    });

    await interview.save();

    res.json({ questions });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Gemini API failed to generate questions' });
  }
});

module.exports = router;
