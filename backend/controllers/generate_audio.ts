import { Request, Response } from "express";
import fetch from 'node-fetch';

const generateAudio = async (req: Request, res: Response) => {
  const { prompt, voice } = req.query;

  const apiKey = process.env.GOOGLE_API_KEY; // Your API Key
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

  const requestBody = {
    input: { text: prompt },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL", name: voice },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.audioContent) {
      // Convert base64 audio content to a Buffer
      const audioBuffer = Buffer.from(data.audioContent, 'base64');

      // Set appropriate headers for audio response
      res.set({
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length,
      });

      // Send the audio buffer back as the response
      res.send(audioBuffer);
    } else {
      res.status(500).json({ error: "Failed to generate audio." });
    }
  } catch (error) {
    console.error("Error generating speech:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export default generateAudio;
