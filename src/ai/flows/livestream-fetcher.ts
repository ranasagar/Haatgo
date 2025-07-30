'use server';

/**
 * @fileOverview A flow to fetch (simulate) livestream data from social media platforms.
 *
 * - fetchLivestream - A function that handles fetching livestream details.
 * - LivestreamInput - The input type for the fetchLivestream function.
 * - LivestreamData - The return type for the fetchLivestream function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const LivestreamInputSchema = z.object({
  platform: z.enum(['facebook', 'tiktok']).describe('The social media platform.'),
  identifier: z.string().describe('The user handle or page name to check.'),
});
export type LivestreamInput = z.infer<typeof LivestreamInputSchema>;

export const LivestreamDataSchema = z.object({
  isLive: z.boolean().describe('Whether the stream is currently live.'),
  streamUrl: z.string().optional().describe('The URL of the livestream feed.'),
  title: z.string().optional().describe('The title of the livestream.'),
  viewerCount: z.number().optional().describe('The number of current viewers.'),
});
export type LivestreamData = z.infer<typeof LivestreamDataSchema>;

export async function fetchLivestream(input: LivestreamInput): Promise<LivestreamData> {
  return livestreamFetcherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'livestreamFetcherPrompt',
  input: { schema: LivestreamInputSchema },
  output: { schema: LivestreamDataSchema },
  prompt: `You are a social media API simulator. A user wants to know if a page/user is currently livestreaming.
  Based on the platform and identifier, decide if they are live.
  
  Platform: {{{platform}}}
  Identifier: {{{identifier}}}
  
  - If they are live, set isLive to true.
  - Generate a plausible, engaging title for the livestream (e.g., "Weekly Deals at HaatGo!", "Flash Sale on new clothing!").
  - Generate a random viewer count between 50 and 500.
  - Set streamUrl to a placeholder video URL.
  - If they are not live, set isLive to false and leave other fields empty.
  
  For this request, please simulate that the user IS LIVE.`,
});

const livestreamFetcherFlow = ai.defineFlow(
  {
    name: 'livestreamFetcherFlow',
    inputSchema: LivestreamInputSchema,
    outputSchema: LivestreamDataSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      // Ensure a placeholder URL is always provided if live
      if (output?.isLive && !output.streamUrl) {
        output.streamUrl = "https://placehold.co/1920x1080.png";
      }
      return output!;
    } catch (error) {
      console.error("AI livestream fetch failed, returning offline status:", error);
      // Fallback to a non-live state on error
      return {
        isLive: false,
      };
    }
  }
);
