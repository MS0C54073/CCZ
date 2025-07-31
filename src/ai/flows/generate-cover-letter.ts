
'use server';

/**
 * @fileOverview An AI agent that generates a cover letter for a job application.
 *
 * - generateCoverLetter - A function that generates the cover letter.
 * - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
 * - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  jobDetails: z.string().describe("The details of the job, including title, company, and description."),
  userProfile: z.string().describe("The user's professional profile, including summary, experience, and skills."),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter text.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert career coach specializing in writing compelling cover letters. Your task is to generate a professional and persuasive cover letter for a user applying for a job.

Use the provided user profile and job details to craft a letter that highlights the user's most relevant qualifications and experiences, aligning them with the requirements of the job.

The tone should be professional, confident, and enthusiastic. The letter should be well-structured, concise, and easy to read. Do not include placeholders for contact information or dates, just write the body of the letter.

User Profile:
{{{userProfile}}}

Job Details:
{{{jobDetails}}}
`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
