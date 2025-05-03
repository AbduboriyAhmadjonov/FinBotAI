import path from 'path';
import fs from 'fs/promises'; // Using the promise-based version

export const getLanguages = async (lang: string): Promise<any> => {
  try {
    const filePath = path.join(import.meta.dirname, `../db/locales/${lang}.json`);
    const data = await fs.readFile(filePath, 'utf-8');

    if (data === '') {
      return { error: 'File is empty' };
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading language file ${lang}.json:`, err);
    return { error: `Error reading file: ${err}` };
  }
};
