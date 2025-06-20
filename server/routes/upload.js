// routes/upload.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume'); // ✅ Import model

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const file = fs.readFileSync(req.file.path);
    const data = await pdfParse(file);
    fs.unlinkSync(req.file.path); // remove file after parsing

    // Save to DB
    const resume = new Resume({
      // userId: '12345', // ← Optional: Use if login is implemented
      company: req.body.company,
      resumeText: data.text,
      originalFileName: req.file.originalname
    });
    await resume.save();

    res.json({ text: data.text, resumeId: resume._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Resume parsing failed' });
  }
});

module.exports = router;
