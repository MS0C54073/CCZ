'use server';

/**
 * @fileOverview An AI agent that summarizes a candidate's profile.
 *
 * - summarizeProfile - A function that summarizes the profile.
 * - SummarizeProfileInput - The input type for the summarizeProfile function.
 * - SummarizeProfileOutput - The return type for the summarizeProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProfileInputSchema = z.object({
  profileText: z
    .string()
    .describe('The text of the candidate profile to summarize.'),
});
export type SummarizeProfileInput = z.infer<typeof SummarizeProfileInputSchema>;

const SummarizeProfileOutputSchema = z.object({
  summary: z.string().describe('A summary of the candidate profile.'),
});
export type SummarizeProfileOutput = z.infer<typeof SummarizeProfileOutputSchema>;

export async function summarizeProfile(input: SummarizeProfileInput): Promise<SummarizeProfileOutput> {
  return summarizeProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProfilePrompt',
  input: {schema: SummarizeProfileInputSchema},
  output: {schema: SummarizeProfileOutputSchema},
  prompt: `You are an expert recruiter specializing in summarizing candidate profiles.

You will use this information to create a concise summary of the candidate's experience, skills, and education.

Profile text: {{{profileText}}}`,
});

const summarizeProfileFlow = ai.defineFlow(
  {
    name: 'summarizeProfileFlow',
    inputSchema: SummarizeProfileInputSchema,
    outputSchema: SummarizeProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
