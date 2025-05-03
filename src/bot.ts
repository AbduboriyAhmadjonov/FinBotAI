import { Telegraf, Context, session } from 'telegraf';
import { config } from './config/env';
import { getLanguages } from './utils/languages';
import { Message } from 'telegraf/typings/core/types/typegram';
import { SceneContext, SceneSession, SceneSessionData } from 'telegraf/scenes';

// Define session interface for regular data
interface BotSessionData {
  language?: string;
  registrationStep?: 'email' | 'phone' | 'password' | 'complete';
  userData?: {
    email?: string;
    phone?: string;
    password?: string;
  };
}

// Extend the default session type with our BotSessionData
interface BotSession extends BotSessionData {}

// Extend the context type to include session and scene
interface BotContext extends Context {
  session: BotSession;
  scene: SceneContext<BotContext>; // Corrected SceneContext type
}

export const bot = new Telegraf<BotContext>(config.TELEGRAM_BOT_TOKEN); // Specify BotContext for Telegraf

// Middleware to initialize session
bot.use(session());

// Command handlers
bot.start(async (ctx) => {
  // Reset session on /start
  ctx.session = {};

  // Show language selection keyboard
  await showLanguageSelection(ctx);
});

// Handle errors
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply('Please try later').catch(() => {});
});

// Language selection handler
async function showLanguageSelection(ctx: BotContext) {
  try {
    const texts = await getLanguages('en'); // Add await here to properly resolve the Promise

    if (texts.error) {
      console.error('Error loading languages:', texts.error);
      await ctx.reply('An error occurred. Please try again later.');
      return;
    }

    console.log('Language selection:', texts);

    await ctx.reply(texts.welcome || 'Select your language:', {
      // Using welcome instead of selectLanguage
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
