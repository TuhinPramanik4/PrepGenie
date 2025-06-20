const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('resume'), async (req, res) => {
  const file = fs.readFileSync(req.file.path);
  const data = await pdfParse(file);
  fs.unlinkSync(req.file.path); 
  res.json({ text: data.text });
});

module.exports = router;
