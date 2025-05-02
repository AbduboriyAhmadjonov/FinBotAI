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

// Admin check middleware
bot.use(async (ctx, next) => {
  // Mark middleware as async
  const userId = ctx.from?.id?.toString(); // Use optional chaining for safety
  if (userId) {
    ctx.state.isAdmin = config.ADMIN_IDS.includes(userId);
  }
  await next();
});

// Command handlers
bot.start(async (ctx) => {
  // Reset session on /start
  ctx.session = {};

  // Show language selection keyboard
  await showLanguageSelection(ctx);
});

bot.help((ctx) => {
  const language = ctx.session?.language || 'en'; // Use optional chaining
  const texts = getLanguages(language);
  return ctx.reply(texts.helpMessage);
});

// Handle errors
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply('Please try later').catch(() => {});
});

// Language selection handler
async function showLanguageSelection(ctx: BotContext) {
  const texts = getLanguages('en'); // Default to English for language selection

  await ctx.reply(texts.selectLanguage, {
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
}

// Handle language selection
bot.action(/lang_(uz|en|ru)/, async (ctx) => {
  const languageCode = ctx.match![1]; // Non-null assertion since regex guarantees a match
  ctx.session.language = languageCode;

  // Answer the callback query to stop loading animation
  await ctx.answerCbQuery();

  const texts = getLanguages(languageCode);
  await ctx.reply(texts.languageSelected);

  // Begin registration process
  await startRegistration(ctx);
});

// Start the registration process
async function startRegistration(ctx: BotContext) {
  const language = ctx.session?.language || 'en'; // Use optional chaining
  const texts = getLanguages(language);

  ctx.session.registrationStep = 'email';
  ctx.session.userData = {};

  await ctx.reply(texts.registrationWelcome);
  await ctx.reply(texts.askEmail);
}

// Handle text messages for registration data collection
bot.on('text', async (ctx) => {
  // Skip if no language selected yet
  if (!ctx.session?.language) {
    // Use optional chaining
    await showLanguageSelection(ctx);
    return;
  }

  const language = ctx.session.language;
  const texts = getLanguages(language);
  const message = ctx.message as Message.TextMessage;

  // Handle registration flow
  if (ctx.session.registrationStep) {
    switch (ctx.session.registrationStep) {
      case 'email':
        // Simple email validation
        if (!validateEmail(message.text)) {
          await ctx.reply(texts.invalidEmail);
          return;
        }

        ctx.session.userData!.email = message.text;
        ctx.session.registrationStep = 'phone';
        await ctx.reply(texts.askPhone);
        break;

      case 'phone':
        // Simple phone validation
        if (!validatePhone(message.text)) {
          await ctx.reply(texts.invalidPhone);
          return;
        }

        ctx.session.userData!.phone = message.text;
        ctx.session.registrationStep = 'password';
        await ctx.reply(texts.askPassword);
        break;

      case 'password':
        // Simple password validation (at least 6 characters)
        if (message.text.length < 6) {
          await ctx.reply(texts.invalidPassword);
          return;
        }

        ctx.session.userData!.password = message.text;
        ctx.session.registrationStep = 'complete';

        // Registration complete
        await completeRegistration(ctx);
        break;

      case 'complete':
        // Regular message handling after registration
        await ctx.reply(`${texts.youSaid}: ${message.text}`);
        break;
    }
  } else {
    // Regular message handling (this shouldn't happen with the new flow)
    await ctx.reply(`${texts.youSaid}: ${message.text}`);
  }
});

// Complete registration process
async function completeRegistration(ctx: BotContext) {
  const language = ctx.session?.language || 'en'; // Use optional chaining
  const texts = getLanguages(language);

  const userData = ctx.session.userData;

  // Here you would typically save the user data to a database
  // For now, just acknowledge registration

  await ctx.reply(texts.registrationComplete, {
    reply_markup: {
      inline_keyboard: [[{ text: texts.mainMenu, callback_data: 'main_menu' }]],
    },
  });

  console.log('User registered:', userData);
}

// Main menu callback
bot.action('main_menu', async (ctx) => {
  const language = ctx.session?.language || 'en'; // Use optional chaining
  const texts = getLanguages(language);

  await ctx.answerCbQuery();
  await ctx.reply(texts.mainMenuMessage, {
    reply_markup: {
      inline_keyboard: [
        [{ text: texts.profile, callback_data: 'profile' }],
        [{ text: texts.settings, callback_data: 'settings' }],
        [{ text: texts.help, callback_data: 'help' }],
      ],
    },
  });
});

// Basic validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  // Simple phone validation - at least 10 digits
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}

// Handle errors
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);

  const language = ctx.session?.language || 'en'; // Use optional chaining
  const texts = getLanguages(language);

  ctx.reply(texts.errorMessage).catch(() => {});
});
