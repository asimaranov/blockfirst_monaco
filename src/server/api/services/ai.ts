import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { env } from '~/env';
import UserDataModel from '~/server/models/userData';
import { SubscriptionType } from '~/app/lib/constants/subsctiptions';
import { PlanType } from '~/server/models/userData';

// Schema for chat message validation
export const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  timestamp: z
    .date()
    .optional()
    .default(() => new Date()),
  feedback: z.enum(['upvote', 'downvote']).nullable().optional(),
  serviceType: z.enum(['error', 'success']).nullable().optional(),
});

export type Message = z.infer<typeof messageSchema>;

// Create Anthropic client
export const createAnthropicClient = () => {
  if (!env.ANTHROPIC_API_KEY) {
    throw new Error(
      'ANTHROPIC_API_KEY is not defined in the environment variables'
    );
  }

  return new Anthropic({
    apiKey: env.ANTHROPIC_API_KEY,
  });
};

// Token limits by plan
export const TOKEN_LIMITS = {
  free: 10000, // 10K
  starter: 100000, // 100K
  pro: 1000000, // 1M
};

// Function to get remaining tokens for user
export async function getRemainingTokens(userId: string): Promise<number> {
  try {
    console.log(`[AI Token] Checking remaining tokens for user ${userId}`);

    const userData = await UserDataModel.findOne({ userId });

    if (!userData) {
      console.log(
        `[AI Token] User ${userId} not found, returning default free limit`
      );
      return TOKEN_LIMITS.free; // Default to free limit if user not found
    }

    // Check if we need to reset tokens (new day)
    const today = new Date();
    const lastReset = userData.aiTokens?.lastResetDate || new Date(0);

    console.log(
      `[AI Token] Last reset date: ${lastReset.toISOString()}, today: ${today.toISOString()}`
    );

    // Reset if date has changed
    if (
      lastReset.getDate() !== today.getDate() ||
      lastReset.getMonth() !== today.getMonth() ||
      lastReset.getFullYear() !== today.getFullYear()
    ) {
      console.log(
        `[AI Token] Resetting tokens for user ${userId} - new day detected`
      );

      const result = await UserDataModel.updateOne(
        { userId },
        {
          $set: {
            'aiTokens.tokensUsedToday': 0,
            'aiTokens.lastResetDate': today,
          },
        }
      );

      console.log(`[AI Token] Reset result:`, result);
      return TOKEN_LIMITS[userData.plan];
    }

    // Calculate remaining tokens
    const tokensUsed = userData.aiTokens?.tokensUsedToday || 0;
    const tokenLimit = TOKEN_LIMITS[userData.plan];
    const remaining = Math.max(0, tokenLimit - tokensUsed);

    console.log(
      `[AI Token] User ${userId} has used ${tokensUsed} tokens out of ${tokenLimit}, ${remaining} remaining`
    );

    return remaining;
  } catch (err) {
    console.error('[AI Token] Error calculating remaining tokens:', err);
    // Default to free limit on error
    return TOKEN_LIMITS.free;
  }
}

// Track token usage for a user
export async function trackTokenUsage(
  userId: string,
  tokenCount: number
): Promise<void> {
  try {
    console.log(`[AI Token] Tracking ${tokenCount} tokens for user ${userId}`);

    // First check if user exists
    const userData = await UserDataModel.findOne({ userId });

    if (userData) {
      // Update existing user's token usage
      const result = await UserDataModel.updateOne(
        { userId },
        {
          $inc: { 'aiTokens.tokensUsedToday': tokenCount },
        }
      );

      console.log(`[AI Token] Update result for existing user:`, result);
    } else {
      // Create new user with token usage
      const newUser = new UserDataModel({
        userId,
        plan: 'free' as PlanType,
        aiTokens: {
          tokensUsedToday: tokenCount,
          lastResetDate: new Date(),
        },
      });

      await newUser.save();
      console.log(`[AI Token] Created new user with ${tokenCount} tokens used`);
    }
  } catch (err) {
    console.error('[AI Token] Error tracking token usage:', err);
    // Don't throw the error to avoid breaking the AI response flow
  }
}

// Get AI completion from Claude
export async function getAiCompletion(
  messages: Message[],
  userId: string
): Promise<string> {
  try {
    // Check remaining tokens
    const remainingTokens = await getRemainingTokens(userId);
    console.log(
      `[AI Token] User ${userId} has ${remainingTokens} tokens remaining`
    );

    if (remainingTokens <= 0) {
      throw new Error('NO_TOKENS_LEFT');
    }

    const client = createAnthropicClient();

    // Format messages for Claude API
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      messages: formattedMessages,
    });

    // Track token usage
    const inputTokens = response.usage.input_tokens;
    const outputTokens = response.usage.output_tokens;
    const totalTokens = inputTokens + outputTokens;

    console.log(
      `[AI Token] Usage for user ${userId}: ${inputTokens} input + ${outputTokens} output = ${totalTokens} total tokens`
    );

    await trackTokenUsage(userId, totalTokens);

    // Log updated token info
    const updatedTokens = await getRemainingTokens(userId);
    console.log(
      `[AI Token] User ${userId} now has ${updatedTokens} tokens remaining after usage`
    );

    // Check the type of content block and extract text accordingly
    const contentBlock = response.content[0];
    if ('text' in contentBlock) {
      return contentBlock.text;
    } else {
      // Handle other content block types or throw an appropriate error
      throw new Error('Unexpected response format from Claude API');
    }
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'NO_TOKENS_LEFT') {
      throw new Error('NO_TOKENS_LEFT');
    }
    console.error('Error getting AI completion:', error);
    // Try to log token usage even if there's an error in response processing
    try {
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'usage' in error.response
      ) {
        const { input_tokens, output_tokens } = error.response.usage as {
          input_tokens: number;
          output_tokens: number;
        };
        const totalTokens = input_tokens + output_tokens;
        console.log(
          `[AI Token] Usage on error for user ${userId}: ${totalTokens} tokens`
        );
        await trackTokenUsage(userId, totalTokens);
      }
    } catch (trackingError) {
      console.error(
        'Error tracking token usage during error handling:',
        trackingError
      );
    }
    throw error;
  }
}
