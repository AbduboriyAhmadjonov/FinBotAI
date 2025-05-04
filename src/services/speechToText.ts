import { SpeechClient } from '@google-cloud/speech';
import { google } from '@google-cloud/speech/build/protos/protos';
import fs from 'fs';
import { config } from '../config/env';
import User from '../db/models/user.model';

// Creates a client
const client = new SpeechClient();

export async function transcribeAudio(audioPath: string, userId: number): Promise<string> {
  try {
    // Get user's language preference from database
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Read the audio file
    const audioContent = fs.readFileSync(audioPath);

    // The audio file's encoding, sample rate, and language
    const request = {
      audio: {
        content: audioContent.toString('base64'),
      },
      config: {
        encoding: google.cloud.speech.v1.RecognitionConfig.AudioEncoding.OGG_OPUS,
        sampleRateHertz: 16000,
        languageCode: `${user.language}-${user.language.toUpperCase()}`,
      },
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription =
      response.results
        ?.map((result) => result.alternatives?.[0]?.transcript)
        .filter(Boolean)
        .join('\n') || '';

    return transcription;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('Failed to transcribe audio');
  }
}
