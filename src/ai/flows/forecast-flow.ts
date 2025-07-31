'use server';

/**
 * @fileOverview A flow to fetch a 7-day weather forecast.
 *
 * - fetchForecast - Fetches a 7-day weather forecast.
 * - ForecastInput - The input type for the fetchForecast function.
 * - ForecastOutput - The return type for the fetchForecast function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ForecastInputSchema = z.object({
  location: z.string().describe('The city to get the forecast for.'),
});
export type ForecastInput = z.infer<typeof ForecastInputSchema>;

const DailyForecastSchema = z.object({
  day: z.string().describe("The day of the week (e.g., 'Monday')."),
  temp: z.number().describe('The average temperature in Celsius.'),
  condition: z.string().describe('A brief description of the weather condition.'),
  icon: z.enum(['Sun', 'CloudSun', 'Cloud', 'Cloudy', 'CloudRain', 'CloudSnow', 'CloudLightning', 'Wind']).describe('An icon name that best represents the condition.'),
});

const ForecastOutputSchema = z.object({
  forecast: z.array(DailyForecastSchema).length(7).describe('An array of 7 daily forecast objects.'),
});
export type ForecastOutput = z.infer<typeof ForecastOutputSchema>;

export async function fetchForecast(input: ForecastInput): Promise<ForecastOutput> {
  return forecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'forecastPrompt',
  input: { schema: ForecastInputSchema },
  output: { schema: ForecastOutputSchema },
  prompt: `You are a weather API simulator. Generate a realistic 7-day weather forecast for the given location.
  
  Location: {{{location}}}
  
  - Start the forecast from today. Use realistic day names (e.g., Today, Tuesday, Wednesday...).
  - Provide a mix of weather conditions for the week (e.g., sunny, partly cloudy, chance of rain).
  - Generate plausible temperatures in Celsius for each day.
  - Select the most appropriate icon for each day's condition from the available options.
  
  Example for one day: { day: "Today", temp: 25, condition: "Partly Cloudy", icon: "CloudSun" }
  
  Generate a complete 7-day forecast now for {{{location}}}.`,
});

const forecastFlow = ai.defineFlow(
  {
    name: 'forecastFlow',
    inputSchema: ForecastInputSchema,
    outputSchema: ForecastOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error) {
      console.error("AI forecast fetch failed, using fallback:", error);
      // Fallback to a default forecast on error
      return {
        forecast: [
          { day: 'Today', temp: 22, condition: 'Sunny', icon: 'Sun' },
          { day: 'Tomorrow', temp: 23, condition: 'Partly Cloudy', icon: 'CloudSun' },
          { day: 'Wednesday', temp: 21, condition: 'Light Rain', icon: 'CloudRain' },
          { day: 'Thursday', temp: 24, condition: 'Sunny', icon: 'Sun' },
          { day: 'Friday', temp: 25, condition: 'Partly Cloudy', icon: 'CloudSun' },
          { day: 'Saturday', temp: 23, condition: 'Cloudy', icon: 'Cloudy' },
          { day: 'Sunday', temp: 22, condition: 'Chance of Rain', icon: 'CloudRain' },
        ]
      };
    }
  }
);
