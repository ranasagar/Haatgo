'use server';

/**
 * @fileOverview A flow to fetch (simulate) current weather conditions.
 *
 * - fetchWeather - A function that handles fetching weather data.
 * - WeatherInput - The input type for the fetchWeather function.
 * - WeatherOutput - The return type for the fetchWeather function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WeatherInputSchema = z.object({
  location: z.string().describe('The city to get the weather for.'),
});
export type WeatherInput = z.infer<typeof WeatherInputSchema>;

const WeatherOutputSchema = z.object({
  temperature: z.number().describe('The current temperature in Celsius.'),
  condition: z.string().describe('A brief description of the weather condition (e.g., Sunny, Partly Cloudy).'),
  icon: z.enum(['Sun', 'Cloud', 'Cloudy', 'CloudSun', 'CloudRain', 'CloudSnow', 'CloudLightning', 'Wind', 'Thermometer']).describe('An icon name that best represents the condition.'),
});
export type WeatherOutput = z.infer<typeof WeatherOutputSchema>;

export async function fetchWeather(input: WeatherInput): Promise<WeatherOutput> {
  return weatherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherPrompt',
  input: { schema: WeatherInputSchema },
  output: { schema: WeatherOutputSchema },
  prompt: `You are a weather API simulator. Based on the location, provide a realistic current weather condition.
  
  Location: {{{location}}}
  
  - Generate a plausible temperature in Celsius for this location.
  - Provide a short weather condition description (e.g., Sunny, Partly Cloudy, Light Rain).
  - Select the most appropriate icon from the available options.
  
  For this request for {{{location}}}, please provide a pleasant, sunny weather condition.`,
});

const weatherFlow = ai.defineFlow(
  {
    name: 'weatherFlow',
    inputSchema: WeatherInputSchema,
    outputSchema: WeatherOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error) {
      console.error("AI weather fetch failed, using fallback:", error);
      // Fallback to a default state on error
      return {
        temperature: 22,
        condition: "Clear",
        icon: "Sun",
      };
    }
  }
);
