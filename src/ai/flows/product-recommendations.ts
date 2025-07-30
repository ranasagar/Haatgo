'use server';

/**
 * @fileOverview A product recommendation AI agent.
 *
 * - productRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the productRecommendations function.
 * - ProductRecommendationsOutput - The return type for the productRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z.string().describe('The user browsing history.'),
  pastPurchases: z.string().describe('The user past purchases.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of product recommendations.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function productRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are an expert at recommending products to users based on their browsing history and past purchases.

  Given the following browsing history:
  {{browsingHistory}}

  And the following past purchases:
  {{pastPurchases}}

  Recommend a list of products that the user might be interested in.`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
       console.error("AI recommendations failed, using fallback:", error);
       // Return a default list of popular items as a fallback
       return {
         recommendations: [
            "Basmati Rice",
            "Warm Fleece Jacket",
            "Solar Powered Lamp",
            "Stainless Steel Pot Set",
            "Sunflower Oil",
         ]
       };
    }
  }
);
