import { Context } from 'telegraf';
import User from '../db/models/user.model';
import { bot } from '../bot';
import { mainKeyboard } from '../keyboards/main';

export async function startCommand(ctx: Context) {
  try {
    if ('from' in ctx.message) {
      const telegramUser = ctx.message.from;

      // Find or create user in database
      const [user, created] = await User.findOrCreate({
        where: { telegramId: telegramUser.id },
        defaults: {
          telegramId: telegramUser.id,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name || null,
          username: telegramUser.username || null,
          language: telegramUser.language_code || 'en',
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

      await ctx.reply(welcomeMessage, {
        reply_markup: mainKeyboard(),
      });
    }
  } catch (error) {
    console.error('Error in start command:', error);
    await ctx.reply('Sorry, something went wrong. Please try again later.');
  }
}

// Register the command
bot.command('start', startCommand);
