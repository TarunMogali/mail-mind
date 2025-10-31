'use server';

import {
  categorizeEmail,
  type CategorizeEmailInput,
  type CategorizeEmailOutput,
} from '@/ai/flows/ai-categorize-emails';
import {
  generateSuggestedReply,
  type AISuggestedReplyInput,
  type AISuggestedReplyOutput,
} from '@/ai/flows/ai-suggested-replies';

export async function categorizeEmailAction(
  input: CategorizeEmailInput
): Promise<CategorizeEmailOutput | { error: string }> {
  try {
    const result = await categorizeEmail(input);
    return result;
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to categorize email.' };
  }
}

export async function generateSuggestedReplyAction(
  input: AISuggestedReplyInput
): Promise<AISuggestedReplyOutput | { error: string }> {
  try {
    const result = await generateSuggestedReply(input);
    return result;
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to generate reply.' };
  }
}
