'use server';

/**
 * @fileOverview A flow to send notifications to users about their order status.
 *
 * - sendOrderNotification - A function that handles sending a notification.
 * - OrderNotificationInput - The input type for the sendOrderNotification function.
 * - OrderNotificationOutput - The return type for the sendOrderNotification function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OrderNotificationInputSchema = z.object({
  customerName: z.string().describe("The customer's name."),
  contact: z.string().describe("The customer's WhatsApp number."),
  productName: z.string().describe("The name of the product."),
  orderId: z.string().describe("The ID of the order."),
  newStatus: z.string().describe("The new status of the order."),
});
export type OrderNotificationInput = z.infer<typeof OrderNotificationInputSchema>;

const OrderNotificationOutputSchema = z.object({
  success: z.boolean().describe('Whether the notification was sent successfully.'),
  message: z.string().describe('The notification message that was sent.'),
});
export type OrderNotificationOutput = z.infer<typeof OrderNotificationOutputSchema>;


export async function sendOrderNotification(input: OrderNotificationInput): Promise<OrderNotificationOutput> {
  return orderNotificationFlow(input);
}


const prompt = ai.definePrompt({
  name: 'orderNotificationPrompt',
  input: { schema: OrderNotificationInputSchema },
  output: { schema: OrderNotificationOutputSchema },
  prompt: `You are a helpful assistant for an e-commerce store called HaatGo. Your task is to craft and send a notification to a customer about their order status update.

  The message should be in NEPALI language.
  It should be friendly and professional.
  
  Customer Name: {{{customerName}}}
  Contact (WhatsApp): {{{contact}}}
  Order ID: {{{orderId}}}
  Product: {{{productName}}}
  New Status: {{{newStatus}}}

  Based on the new status, generate an appropriate message.
  - If status is 'Out for Delivery', say something like "Your order is on its way!".
  - If status is 'Completed', say something like "Your order has been delivered. Thank you for shopping with us!".
  - If status is 'Pending', say something like "Your order status is updated to pending. We will notify you again soon.".

  Simulate sending this message. For this simulation, always set success to true.
  
  Example message for 'Out for Delivery':
  "नमस्ते {{{customerName}}}! तपाईंको अर्डर #{{{orderId}}} ({{{productName}}}) এখন ডেলিভারির জন্য বাড়িয়েছে। हाम्रो डेलिभरी पार्टनर चाँडै तपाईं समक्ष पुग्दैछ। धन्यवाद!"
  
  Now, generate the response for the provided details.`,
});


const orderNotificationFlow = ai.defineFlow(
  {
    name: 'orderNotificationFlow',
    inputSchema: OrderNotificationInputSchema,
    outputSchema: OrderNotificationOutputSchema,
  },
  async (input) => {
    try {
      // In a real app, you'd integrate with a messaging API like Twilio here.
      console.log(`Simulating sending notification to ${input.contact}`);
      const { output } = await prompt(input);
      console.log(`Generated notification: ${output?.message}`);
      return output!;
    } catch (error) {
      console.error("AI notification generation failed:", error);
      return {
        success: false,
        message: "Failed to generate notification.",
      };
    }
  }
);
