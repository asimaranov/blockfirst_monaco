import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { env } from '~/env';

// Schema for chat message validation
export const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  timestamp: z
    .date()
    .optional()
    .default(() => new Date()),
  feedback: z.enum(['upvote', 'downvote']).nullable().optional(),
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

// Get AI completion from Claude
export async function getAiCompletion(messages: Message[]): Promise<string> {
  const client = createAnthropicClient();

  try {
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

    // Check the type of content block and extract text accordingly
    const contentBlock = response.content[0];
    if ('text' in contentBlock) {
      return contentBlock.text;
    } else {
      // Handle other content block types or throw an appropriate error
      throw new Error('Unexpected response format from Claude API');
    }
  } catch (error) {
    console.error('Error getting AI completion:', error);
    throw error;
  }
}
