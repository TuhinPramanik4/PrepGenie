const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/TxGEqnHWrfWFTfGW9XjX',
      {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.7,
        },
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    res.set('Content-Type', 'audio/mpeg');
    res.send(response.data);
  } catch (err) {
    console.error('TTS Error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate voice from ElevenLabs' });
  }
});

module.exports = router;
