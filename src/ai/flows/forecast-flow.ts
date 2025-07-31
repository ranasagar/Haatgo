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
  date: z.string().describe("The date in 'Month Day' format (e.g., 'Jul 31')."),
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
  - Provide the date for each day in "Mon Day" format (e.g., "Jul 31").
  - Provide a mix of weather conditions for the week (e.g., sunny, partly cloudy, chance of rain).
  - Generate plausible temperatures in Celsius for each day.
  - Select the most appropriate icon for each day's condition from the available options.
  
  Example for one day: { day: "Today", date: "Jul 31", temp: 25, condition: "Partly Cloudy", icon: "CloudSun" }
  
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
      const today = new Date();
      const format = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const getDayName = (d: Date, index: number) => {
        if (index === 0) return 'Today';
        if (index === 1) return 'Tomorrow';
        return d.toLocaleDateString('en-US', { weekday: 'long' });
      }

      const fallbackForecast = Array.from({ length: 7 }).map((_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const base = {
              date: format(date),
              day: getDayName(date, i),
          };
          switch(i) {
              case 0: return {...base, temp: 22, condition: 'Sunny', icon: 'Sun' };
              case 1: return {...base, temp: 23, condition: 'Partly Cloudy', icon: 'CloudSun' };
              case 2: return {...base, temp: 21, condition: 'Light Rain', icon: 'CloudRain' };
              case 3: return {...base, temp: 24, condition: 'Sunny', icon: 'Sun' };
              case 4: return {...base, temp: 25, condition: 'Partly Cloudy', icon: 'CloudSun' };
              case 5: return {...base, temp: 23, condition: 'Cloudy', icon: 'Cloudy' };
              default: return {...base, temp: 22, condition: 'Chance of Rain', icon: 'CloudRain' };
          }
      });
      
      return { forecast: fallbackForecast };
    }
  }
);
