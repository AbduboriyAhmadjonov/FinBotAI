import path from 'path';
import fs from 'fs';

import.meta.dirname; // The current module's directory name
import.meta.filename; // The current module's file name

export const getLanguages = (lang: string) => {
  const data = fs.readFileSync(
    path.join(import.meta.dirname, `../db/locales/${lang}.json`),
    'utf-8'
  );
  return JSON.parse(data);
};
