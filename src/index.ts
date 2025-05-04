import { bot } from './bot.js';
import { config } from './config/env.js';
import { testConnection } from './db/connection.js';

// Import all commands
import './commands/start.js';
import './commands/help.js';

async function startBot() {
  try {
    // Test database connection first
    await testConnection();

    if (config.NODE_ENV === 'production') {
      // Production mode: use webhook
      await bot.launch({
        webhook: {
          domain: config.URL,
          port: config.PORT,
          secretToken: 'randomAlphaNumericString',
        },
      });
      console.log(`Bot started in production mode on port ${config.PORT}`);
      console.log(`Webhook set to ${config.URL}`);
    } else {
      // Development mode: use polling
      await bot.launch();
      console.log('Bot started in development mode');
    }

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (error) {
    console.error('Failed to start the bot:', error);
    process.exit(1);
  }
}

// Start the bot
startBot();
