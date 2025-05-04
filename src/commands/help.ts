import { Context } from 'telegraf';
import { bot } from '../bot.js';

export async function helpCommand(ctx: Context) {
  try {
    const helpMessage = 'FinBot AI - Your Personal Finance Assistant 🤖💰\n\n';

    const commands = [
      '/start - Start or restart the bot',
      '/help - Show this help message',
      '/expense - Log a new expense',
      '/report - Generate a financial report',
      '/budget - Set or view your budget',
      '/categories - View or modify expense categories',
      '/settings - Configure your preferences',
    ];

    const usage = [
      '🗣 *Voice input*: Record a voice message describing your expense',
      '✍️ *Text input*: Type your expense (e.g., "Spent $25 on groceries")',
      '📊 *Reports*: Get insights about your spending patterns',
      '💼 *Budgeting*: Set monthly budgets and track your progress',
    ];

    const helpText = [
      helpMessage,
      '\n*Available Commands:*\n' + commands.join('\n'),
      '\n*How to Use:*\n' + usage.join('\n'),
      '\n*Need more help?*\nContact us at support@finbotai.com',
    ].join('\n');

    await ctx.replyWithMarkdownV2(helpText.replace(/[.]/g, '\\.').replace(/[-]/g, '\\-'));
  } catch (error) {
    console.error('Error in help command:', error);
    await ctx.reply('Sorry, something went wrong. Please try again later.');
  }
}

// Register the command
bot.command('help', helpCommand);
