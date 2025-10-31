'use server';
/**
 * @fileOverview This file implements the AI-powered suggested replies flow.
 * 
 * - generateSuggestedReply - A function that takes an email and context data and suggests a reply.
 * - AISuggestedReplyInput - The input type for the generateSuggestedReply function.
 * - AISuggestedReplyOutput - The return type for the generateSuggestedReply function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISuggestedReplyInputSchema = z.object({
  emailBody: z.string().describe('The body of the email to reply to.'),
  productAndOutreachAgenda: z.string().describe('The product and outreach agenda stored in a vector database.'),
});
export type AISuggestedReplyInput = z.infer<typeof AISuggestedReplyInputSchema>;

const AISuggestedReplyOutputSchema = z.object({
  suggestedReply: z.string().describe('The AI-generated suggested reply to the email.'),
});
export type AISuggestedReplyOutput = z.infer<typeof AISuggestedReplyOutputSchema>;

export async function generateSuggestedReply(input: AISuggestedReplyInput): Promise<AISuggestedReplyOutput> {
  return aiSuggestedReplyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSuggestedReplyPrompt',
  input: {schema: AISuggestedReplyInputSchema},
  output: {schema: AISuggestedReplyOutputSchema},
  prompt: `You are an AI assistant that suggests replies to emails based on the provided context data.  The goal is to generate a reply that is relevant to the email and aligns with the product and outreach agenda.

Email Body: {{{emailBody}}}

Product and Outreach Agenda: {{{productAndOutreachAgenda}}}

Suggested Reply:`,
});

const aiSuggestedReplyFlow = ai.defineFlow(
  {
    name: 'aiSuggestedReplyFlow',
    inputSchema: AISuggestedReplyInputSchema,
    outputSchema: AISuggestedReplyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
