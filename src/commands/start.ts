import { Context } from 'telegraf';
import { Update, Message } from '@telegraf/types';
import User from '../db/models/user.model.js';
import { bot } from '../bot.js';
import { mainKeyboard } from '../keyboards/main.js';

interface MessageContext extends Context {
  message: Update.New & Update.NonChannel & Message.TextMessage;
}

export async function startCommand(ctx: MessageContext) {
  try {
    const telegramUser = ctx.message.from;
    const now = new Date();

    // Find or create user in database with required timestamps
    const [user, created] = await User.findOrCreate({
      where: { telegramId: telegramUser.id },
      defaults: {
        telegramId: telegramUser.id,
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        username: telegramUser.username,
        language: telegramUser.language_code || 'en',
        createdAt: now,
        updatedAt: now,
      },
    });

    let welcomeMessage = '';

    if (created) {
      welcomeMessage = `Welcome to FinBot AI, ${telegramUser.first_name}! 🤖💰\n\n`;
      welcomeMessage +=
        'I am your personal finance assistant. I can help you track expenses, set budgets, and provide financial insights.\n\n';
      welcomeMessage += 'You can log expenses by:\n';
      welcomeMessage += '- Sending a voice message describing your purchase\n';
      welcomeMessage += '- Typing your expense (e.g., "Spent $25 on groceries")\n\n';
      welcomeMessage += 'Use the keyboard below to navigate or type /help for more information.';
    } else {
      welcomeMessage = `Welcome back, ${telegramUser.first_name}! 🤖💰\n\n`;
      welcomeMessage += 'How can I help you with your finances today?';
    }

    const keyboard = mainKeyboard();
    await ctx.reply(welcomeMessage, {
      parse_mode: 'HTML',
      reply_markup: keyboard.reply_markup,
    });
  } catch (error) {
    console.error('Error in start command:', error);
    await ctx.reply('Sorry, something went wrong. Please try again later.');
  }
}

// Register the command
bot.command('start', startCommand);
