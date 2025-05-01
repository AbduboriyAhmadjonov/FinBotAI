# FinBot AI

![FinBot AI Logo](public/images/logo.jpg)

## AI-powered personal finance manager Telegram Bot

FinBot AI is a comprehensive personal finance management solution that operates through Telegram. It utilizes artificial intelligence to process voice inputs, categorize expenses intelligently, and provide real-time financial insights to help users take control of their finances.

## Features

- **Voice Input Support**: Record voice messages to log expenses and financial transactions
- **Smart Expense Categorization**: AI-powered categorization of expenses with minimal user input
- **Real-time Financial Insights**: Get instant analytics on spending patterns and budget adherence
- **Multi-Currency Support**: Track expenses in different currencies
- **Budget Planning**: Set monthly budgets and receive alerts when approaching limits
- **Expense Tracking**: Log and monitor your daily expenses effortlessly
- **Financial Reports**: Generate visual reports of your spending habits
- **Secure Data Management**: All financial data is encrypted and securely stored

## Technology Stack

- **Backend**: Node.js
- **Database**: PostgreSQL
- **Voice Processing**: Google Speech-to-text API
- **API Integration**: Telegram Bot API
- **Deployment**: Docker containerization

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Telegram Bot Token (get it from [@BotFather](https://t.me/botfather))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/finbot-ai.git
cd finbot-ai
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following configuration:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
GOOGLE_API_KEY=your_google_api_key
CLAUDE_API_KEY=your_claude_api_key
DATABASE_URL=postgres://username:password@localhost:5432/finbot
NODE_ENV=development
```

4. Set up the database:

```bash
npm run db:setup
```

5. Start the development server:

```bash
npm run dev
```

## Usage

1. Start a conversation with your bot on Telegram
2. Use the `/start` command to begin the onboarding process
3. You can input expenses via:
   - Text messages: "Spent $25 on groceries"
   - Voice messages: Just say what you spent money on
4. Use commands like `/report` or `/budget` to get insights about your finances

## Available Commands

- `/start` - Begin using FinBot AI
- `/help` - Display available commands
- `/expense` - Log a new expense
- `/income` - Log a new income
- `/report` - Generate a financial report
- `/budget` - Set or view your budget
- `/categories` - View or modify expense categories
- `/settings` - Configure your preferences

## Development

### Project Structure

```
finbot-ai/
├── src/
│   ├── bot/           # Telegram bot integration
│   ├── controllers/   # Business logic
│   ├── models/        # Database models
│   ├── services/      # External service integrations
│   ├── utils/         # Helper functions
│   └── index.js       # Entry point
├── tests/             # Test files
├── .env               # Environment variables
└── package.json       # Project dependencies
```

### Running Tests

```bash
npm test
```

### Deployment

Deploy the application using Docker:

```bash
docker-compose up -d
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Contact

Abduboriy Ahmadjonov - ahmadjonovabduboriy3@gmail.com

Project Link: [https://github.com/AbduboriyAhmadjonov/finbot-ai](https://github.com/AbduboriyAhmadjonov/finbot-ai)
