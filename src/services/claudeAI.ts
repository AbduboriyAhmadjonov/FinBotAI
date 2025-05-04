import Client from '@anthropic-ai/sdk';
import { config } from '../config/env.js';

const claudeClient = new Client({
  apiKey: config.CLAUDE_API_KEY,
});

export async function getFinancialInsights(
  userId: number,
  period: 'week' | 'month' = 'month'
): Promise<string> {
  try {
    // Get user's expenses data from the database
    // Implementation of fetching user's expenses...
    const userExpenseData = {
      totalSpent: 1250.75,
      categories: {
        food: 350.25,
        transportation: 125.5,
        entertainment: 200.0,
        utilities: 175.0,
        shopping: 400.0,
      },
      previousPeriodChange: +50.25, // positive means spending increased
    };

    // Prepare the prompt for Claude AI
    const prompt = `
    I'm an AI financial assistant analyzing a user's spending for the past ${period}. Please provide personalized financial insights and suggestions based on this data:

    Total spent: $${userExpenseData.totalSpent}
    Spending by category:
    - Food: $${userExpenseData.categories.food}
    - Transportation: $${userExpenseData.categories.transportation}
    - Entertainment: $${userExpenseData.categories.entertainment}
    - Utilities: $${userExpenseData.categories.utilities}
    - Shopping: $${userExpenseData.categories.shopping}
    
    Compared to previous ${period}: ${
      userExpenseData.previousPeriodChange > 0 ? 'Increased' : 'Decreased'
    } by $${Math.abs(userExpenseData.previousPeriodChange)}

    Please provide:
    1. A brief analysis of the spending patterns
    2. 2-3 actionable suggestions to improve financial health
    3. Highlight any concerning trends or positive habits
    
    Format your response in a friendly, encouraging tone aimed at a non-financial expert. Keep it concise (max 250 words).
    `;

    // Call Claude API
    const response = await claudeClient.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Access the response content safely
    if (!response.content || response.content.length === 0) {
      throw new Error('No response content from Claude AI');
    }

    const firstContent = response.content[0];
    if (!('text' in firstContent)) {
      throw new Error('Unexpected response format from Claude AI');
    }

    return firstContent.text;
  } catch (error) {
    console.error('Error getting financial insights from Claude:', error);
    return "I couldn't generate personalized insights at the moment. Please try again later.";
  }
}
