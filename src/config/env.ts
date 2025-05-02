import dotenv from 'dotenv';
dotenv.config();

export const config = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY || '',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/finbot',
  DB_NAME: process.env.DB_NAME || 'finbot',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  PORT: Number(process.env.PORT) || 3000,
  URL: process.env.URL || 'https://your-app.herokuapp.com',
  ADMIN_IDS: process.env.ADMIN_IDS ? process.env.ADMIN_IDS.split(',') : [],
  NODE_ENV: process.env.NODE_ENV || 'development',
  REQUIRED_CHANNELS: [process.env.REQUIRED_CHANNELS || ''],
};
