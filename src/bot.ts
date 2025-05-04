import { Telegraf, Context } from 'telegraf';
import { Message, Update } from '@telegraf/types';
import { config } from './config/env.js';
import { getLanguages } from './utils/languages.js';

// Define custom session interface
interface SessionData {
  language?: string;
  registrationStep?: 'email' | 'phone' | 'password' | 'complete';
  userData?: {
    email?: string;
    phone?: string;
    password?: string;
  };
}

// Define custom context interface
interface MyContext extends Context {
  session: SessionData;
}

// Create bot instance with custom context
export const bot = new Telegraf<MyContext>(config.TELEGRAM_BOT_TOKEN);

// Initialize session middleware
bot.use(async (ctx, next) => {
  if (!ctx.session) {
    ctx.session = {};
  }
  return next();
});

// Command handlers
bot.command('start', async (ctx) => {
  // Reset session
  ctx.session = {};
  await showLanguageSelection(ctx);
});

// Handle errors
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply('An error occurred. Please try again later.').catch(console.error);
});

// Language selection handler
async function showLanguageSelection(ctx: MyContext) {
  try {
    const texts = await getLanguages('en');

    if ('error' in texts) {
      console.error('Error loading languages:', texts.error);
      await ctx.reply('An error occurred. Please try again later.');
      return;
    }

    await ctx.reply(texts.welcome || 'Select your language:', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🇺🇿 O'zbekcha", callback_data: 'lang_uz' },
            { text: '🇬🇧 English', callback_data: 'lang_en' },
            { text: '🇷🇺 Русский', callback_data: 'lang_ru' },
          ],
        ],
      },
    });
  } catch (error) {
    console.error('Error in showLanguageSelection:', error);
    await ctx.reply('An error occurred. Please try again later.');
  }
}
