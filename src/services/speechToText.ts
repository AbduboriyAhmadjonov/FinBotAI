import speech from '@google-cloud/speech';
import fs from 'fs';
import { config } from '../config/env';

// Creates a client
const client = new speech.SpeechClient();

export async function transcribeAudio(audioPath: string): Promise<string> {
  try {
    // Read the audio file
    const audioContent = fs.readFileSync(audioPath);

    // The audio file's encoding, sample rate, and language
    const request = {
      audio: {
        content: audioContent.toString('base64'),
      },
      config: {
        encoding: 'OGG_OPUS',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      },
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription =
      response.results?.map((result) => result.alternatives?.[0].transcript).join('\n') || '';

    return transcription;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('Failed to transcribe audio');
  }
}
