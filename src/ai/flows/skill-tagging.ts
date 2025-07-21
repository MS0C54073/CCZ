'use server';

/**
 * @fileOverview Provides AI-suggested skill tags for job postings based on the job description.
 *
 * - suggestSkillTags - A function that suggests skill tags for a given job description.
 * - SuggestSkillTagsInput - The input type for the suggestSkillTags function.
 * - SuggestSkillTagsOutput - The return type for the suggestSkillTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSkillTagsInputSchema = z.object({
  jobDescription: z.string().describe('The description of the job posting.'),
});
export type SuggestSkillTagsInput = z.infer<typeof SuggestSkillTagsInputSchema>;

const SuggestSkillTagsOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('An array of suggested skill tags for the job posting.'),
});
export type SuggestSkillTagsOutput = z.infer<typeof SuggestSkillTagsOutputSchema>;

export async function suggestSkillTags(input: SuggestSkillTagsInput): Promise<SuggestSkillTagsOutput> {
  return suggestSkillTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSkillTagsPrompt',
  input: {schema: SuggestSkillTagsInputSchema},
  output: {schema: SuggestSkillTagsOutputSchema},
  prompt: `You are an expert recruitment assistant. Based on the job description provided, suggest a list of relevant skill tags that would help in categorizing the job and attracting the right candidates. Only return the list of skills. Do not provide any extra explanation.

Job Description: {{{jobDescription}}}`,
});

const suggestSkillTagsFlow = ai.defineFlow(
  {
    name: 'suggestSkillTagsFlow',
    inputSchema: SuggestSkillTagsInputSchema,
    outputSchema: SuggestSkillTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
