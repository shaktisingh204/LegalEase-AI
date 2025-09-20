'use server';

/**
 * @fileOverview Generates a plain language summary of a document in bullet points.
 *
 * - generatePlainLanguageSummary - A function that generates the plain language summary.
 * - GeneratePlainLanguageSummaryInput - The input type for the generatePlainLanguageSummary function.
 * - GeneratePlainLanguageSummaryOutput - The return type for the generatePlainLanguageSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePlainLanguageSummaryInputSchema = z.object({
  text: z
    .string()
    .describe('The text to summarize in plain language with bullet points.'),
  language: z.string().describe('The language for the summary (e.g., "English", "Hindi").'),
});
export type GeneratePlainLanguageSummaryInput = z.infer<
  typeof GeneratePlainLanguageSummaryInputSchema
>;

const GeneratePlainLanguageSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('The plain language summary of the text in bullet points.'),
});
export type GeneratePlainLanguageSummaryOutput = z.infer<
  typeof GeneratePlainLanguageSummaryOutputSchema
>;

export async function generatePlainLanguageSummary(
  input: GeneratePlainLanguageSummaryInput
): Promise<GeneratePlainLanguageSummaryOutput> {
  return generatePlainLanguageSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePlainLanguageSummaryPrompt',
  input: {schema: GeneratePlainLanguageSummaryInputSchema},
  output: {schema: GeneratePlainLanguageSummaryOutputSchema},
  prompt: `You are an expert legal analyst. Analyze the following legal document and provide a simplified, plain-language summary of the most important clauses, risks, and obligations for a non-lawyer. Present the output as a list of bullet points. Generate the summary in {{{language}}}:\n\n{{text}}`,
});

const generatePlainLanguageSummaryFlow = ai.defineFlow(
  {
    name: 'generatePlainLanguageSummaryFlow',
    inputSchema: GeneratePlainLanguageSummaryInputSchema,
    outputSchema: GeneratePlainLanguageSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
