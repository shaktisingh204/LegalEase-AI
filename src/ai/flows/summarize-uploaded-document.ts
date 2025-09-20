'use server';

/**
 * @fileOverview Summarizes an uploaded document using AI.
 *
 * - summarizeUploadedDocument - A function that summarizes an uploaded document.
 * - SummarizeUploadedDocumentInput - The input type for the summarizeUploadedDocument function.
 * - SummarizeUploadedDocumentOutput - The return type for the summarizeUploadedDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUploadedDocumentInputSchema = z.object({
  text: z.string().describe('The text content of the document to summarize.'),
  language: z.string().describe('The language for the summary (e.g., "English", "Hindi").'),
});
export type SummarizeUploadedDocumentInput = z.infer<
  typeof SummarizeUploadedDocumentInputSchema
>;

const SummarizeUploadedDocumentOutputSchema = z.object({
  summary: z.string().describe('The concise summary of the document.'),
});
export type SummarizeUploadedDocumentOutput = z.infer<
  typeof SummarizeUploadedDocumentOutputSchema
>;

export async function summarizeUploadedDocument(
  input: SummarizeUploadedDocumentInput
): Promise<SummarizeUploadedDocumentOutput> {
  return summarizeUploadedDocumentFlow(input);
}

const summarizeUploadedDocumentPrompt = ai.definePrompt({
  name: 'summarizeUploadedDocumentPrompt',
  input: {schema: SummarizeUploadedDocumentInputSchema},
  output: {schema: SummarizeUploadedDocumentOutputSchema},
  prompt: `You are an expert legal analyst. Provide a concise, high-level summary of the following legal document. The summary should be easy for a non-lawyer to understand. Generate the summary in {{{language}}}:\n\n{{{text}}}`,
});

const summarizeUploadedDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeUploadedDocumentFlow',
    inputSchema: SummarizeUploadedDocumentInputSchema,
    outputSchema: SummarizeUploadedDocumentOutputSchema,
  },
  async input => {
    const {output} = await summarizeUploadedDocumentPrompt(input);
    return output!;
  }
);
