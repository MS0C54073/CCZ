'use server';

/**
 * @fileOverview An AI agent that parses a CV and extracts structured data.
 *
 * - parseCv - A function that handles the CV parsing process.
 * - ParseCvInput - The input type for the parseCv function.
 * - ParseCvOutput - The return type for the parseCv function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ParseCvInputSchema = z.object({
  cvDataUri: z
    .string()
    .describe(
      "A user's CV file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ParseCvInput = z.infer<typeof ParseCvInputSchema>;

export const ExperienceSchema = z.object({
  title: z.string().describe('The job title.'),
  company: z.string().describe('The company name.'),
  years: z.string().describe('The employment dates (e.g., "2020 - Present" or "Jan 2021 - Dec 2022").'),
  description: z.string().describe('A description of the role and responsibilities.'),
});

export const EducationSchema = z.object({
  degree: z.string().describe('The degree or qualification obtained.'),
  school: z.string().describe('The name of the school or university.'),
  year: z.string().describe('The year of graduation or completion.'),
});

export const CertificationSchema = z.object({
    name: z.string().describe('The name of the certification.'),
    issuingBody: z.string().describe('The organization that issued the certification.'),
    year: z.string().describe('The year the certification was obtained.'),
});

export const ParseCvOutputSchema = z.object({
  fullName: z.string().optional().describe("The user's full name."),
  email: z.string().optional().describe("The user's email address."),
  phone: z.string().optional().describe("The user's phone number."),
  address: z.string().optional().describe("The user's physical address."),
  portfolio: z.string().optional().describe("A link to the user's portfolio or website."),
  summary: z.string().optional().describe('A professional summary from the CV.'),
  skills: z.array(z.object({ value: z.string() })).optional().describe('A list of skills.'),
  experience: z.array(ExperienceSchema).optional().describe('A list of work experiences.'),
  education: z.array(EducationSchema).optional().describe('A list of education entries.'),
  certifications: z.array(CertificationSchema).optional().describe('A list of certifications.'),
});
export type ParseCvOutput = z.infer<typeof ParseCvOutputSchema>;

export async function parseCv(input: ParseCvInput): Promise<ParseCvOutput> {
  return parseCvFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseCvPrompt',
  input: {schema: ParseCvInputSchema},
  output: {schema: ParseCvOutputSchema},
  prompt: `You are an expert CV and Resume parser. Your task is to analyze the provided document and extract the user's professional information into a structured JSON format.

Pay close attention to details, especially dates for work experience and education. Extract all relevant sections including personal details, summary, skills, work history, education, and certifications. If a section is not present, return an empty array or undefined for that field.

CV Document: {{media url=cvDataUri}}`,
});

const parseCvFlow = ai.defineFlow(
  {
    name: 'parseCvFlow',
    inputSchema: ParseCvInputSchema,
    outputSchema: ParseCvOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
