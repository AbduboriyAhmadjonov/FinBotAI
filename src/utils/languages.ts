import path from 'path';
import fs from 'fs';

import.meta.dirname; // The current module's directory name
import.meta.filename; // The current module's file name

export const getLanguages = (lang: string) => {
  switch (lang) {
    case 'uz':
      return JSON.parse(
        fs.readFileSync(path.join(import.meta.dirname, '../locales/uz.json'), 'utf-8')
      );
    case 'en':
      return JSON.parse(
        fs.readFileSync(path.join(import.meta.dirname, '../locales/en.json'), 'utf-8')
      );
    case 'ru':
      return JSON.parse(
        fs.readFileSync(path.join(import.meta.dirname, '../locales/ru.json'), 'utf-8')
      );
  }
};
