'use server';
/**
 * @fileOverview AI-powered email categorization flow.
 *
 * - categorizeEmail - A function that categorizes an email.
 * - CategorizeEmailInput - The input type for the categorizeEmail function.
 * - CategorizeEmailOutput - The return type for the categorizeEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeEmailInputSchema = z.object({
  emailContent: z.string().describe('The content of the email to categorize.'),
});
export type CategorizeEmailInput = z.infer<typeof CategorizeEmailInputSchema>;

const CategorizeEmailOutputSchema = z.object({
  category: z
    .enum([
      'Interested',
      'Meeting Booked',
      'Not Interested',
      'Spam',
      'Out of Office',
    ])
    .describe('The AI-determined category of the email.'),
});
export type CategorizeEmailOutput = z.infer<typeof CategorizeEmailOutputSchema>;

export async function categorizeEmail(
  input: CategorizeEmailInput
): Promise<CategorizeEmailOutput> {
  return categorizeEmailFlow(input);
}

const categorizeEmailPrompt = ai.definePrompt({
  name: 'categorizeEmailPrompt',
  input: {schema: CategorizeEmailInputSchema},
  output: {schema: CategorizeEmailOutputSchema},
  prompt: `You are an AI email categorization expert.  Given the content of an email, determine which of the following categories it belongs to: Interested, Meeting Booked, Not Interested, Spam, Out of Office.  Return ONLY the category.\n\nEmail Content: {{{emailContent}}}`,
});

const categorizeEmailFlow = ai.defineFlow(
  {
    name: 'categorizeEmailFlow',
    inputSchema: CategorizeEmailInputSchema,
    outputSchema: CategorizeEmailOutputSchema,
  },
  async input => {
    const {output} = await categorizeEmailPrompt(input);
    return output!;
  }
);
