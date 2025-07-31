
'use server';

/**
 * @fileOverview A flow to generate weather and road conditions for a given route.
 *
 * - getRouteConditions - A function that handles fetching route condition details.
 * - RouteConditionsInput - The input type for the getRouteConditions function.
 * - RouteConditionsOutput - The return type for the getRouteConditions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const RouteConditionsInputSchema = z.object({
  routeName: z.string().describe('The name of the route.'),
  stops: z.array(z.string()).describe('A list of stops along the route.'),
});
export type RouteConditionsInput = z.infer<typeof RouteConditionsInputSchema>;

const RouteConditionsOutputSchema = z.object({
  conditions: z.array(z.string()).describe('A list of weather and road condition reports.'),
});
export type RouteConditionsOutput = z.infer<typeof RouteConditionsOutputSchema>;

export async function getRouteConditions(input: RouteConditionsInput): Promise<RouteConditionsOutput> {
  return routeConditionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'routeConditionsPrompt',
  input: { schema: RouteConditionsInputSchema },
  output: { schema: RouteConditionsOutputSchema },
  prompt: `You are a live traffic and weather reporting system for a traveling marketplace in Nepal.
  Your goal is to provide brief, helpful, and realistic updates for a specific route.
  
  The current route is the {{{routeName}}} route, which includes stops like {{#each stops}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.

  Generate 3-4 plausible updates based on this route. Mix weather conditions (sun, rain, fog) and road conditions (clear, traffic, minor delays, construction).
  Keep each update short and to the point.
  
  Example updates:
  - "Roads are clear on the Bhedetar to Sankhejung section."
  - "Expect light showers near Chisapani Market this morning."
  - "Minor traffic delay reported near the Bhedetar Junction due to market day."
  - "Sunny skies expected for the entire route today."
  
  Now, generate the response for the provided route details.`,
});

const routeConditionsFlow = ai.defineFlow(
  {
    name: 'routeConditionsFlow',
    inputSchema: RouteConditionsInputSchema,
    outputSchema: RouteConditionsOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error) {
      console.error("AI route condition generation failed, using fallback:", error);
      // Fallback to a default message on error
      return {
        conditions: [
          "Live updates are currently unavailable. Please proceed with caution.",
        ]
      };
    }
  }
);
