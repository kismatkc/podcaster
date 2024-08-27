
  const generateSpeech = async (prompt: string) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Replace with your actual API key
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    const requestBody = {
      input: { text: prompt },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.audioContent) {
        // Convert base64 audio content to a blob URL
        const audioBlob = new Blob([Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))], { type: 'audio/mp3' });
        return URL.createObjectURL(audioBlob);
      } else {
        throw new Error('Failed to generate audio.');
      }
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  };

  
export default generateSpeech;
