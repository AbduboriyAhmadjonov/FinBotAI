import dotenv from 'dotenv';
dotenv.config();

const env: {
  TELEGRAM_BOT_TOKEN: string;
  GOOGLE_API_KEY?: string;
  CLAUDE_API_KEY?: string;
  ADMIN_IDS: string[];
  NODE_ENV: string;
} = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN!,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY!,
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY!,
  ADMIN_IDS: process.env.ADMIN_IDS ? process.env.ADMIN_IDS.split(',') : [],
  NODE_ENV: process.env.NODE_ENV || 'development',
};

if (!env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is not defined in the environment variables.');
}
if (!env.GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY is not defined in the environment variables.');
}
if (!env.CLAUDE_API_KEY) {
  throw new Error('CLAUDE_API_KEY is not defined in the environment variables.');
}

export { env };
