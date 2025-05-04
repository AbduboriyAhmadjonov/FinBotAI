import dotenv from 'dotenv';
dotenv.config();

export const config = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN as string,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY as string,
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  DB_NAME: process.env.DB_NAME as string,
  DB_USER: process.env.DB_USER as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: Number(process.env.DB_PORT) as number,
  PORT: Number(process.env.PORT) as number,
  URL: process.env.URL as string,
  ADMIN_IDS: process.env.ADMIN_IDS ? process.env.ADMIN_IDS.split(',') : [],
  NODE_ENV: process.env.NODE_ENV || 'development',
  REQUIRED_CHANNELS: [process.env.REQUIRED_CHANNELS as string],
};
