'use server';

/**
 * @fileOverview An AI agent that answers questions about a document.
 *
 * - answerDocumentQuestions - A function that handles question answering about a document.
 * - AnswerDocumentQuestionsInput - The input type for the answerDocumentQuestions function.
 * - AnswerDocumentQuestionsOutput - The return type for the answerDocumentQuestions function.
 */

import {ai} from '@/ai/genkit';
import { translateText } from '@/services/translate';
import {z} from 'genkit';

const AnswerDocumentQuestionsInputSchema = z.object({
  documentText: z.string().describe('The text content of the document.'),
  question: z.string().describe('The question to be answered about the document.'),
  language: z.string().describe('The language to answer in (e.g., "en", "hi").'),
});
export type AnswerDocumentQuestionsInput = z.infer<
  typeof AnswerDocumentQuestionsInputSchema
>;

const AnswerDocumentQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the document.'),
});
export type AnswerDocumentQuestionsOutput = z.infer<
  typeof AnswerDocumentQuestionsOutputSchema
>;

export async function answerDocumentQuestions(
  input: AnswerDocumentQuestionsInput
): Promise<AnswerDocumentQuestionsOutput> {
  return answerDocumentQuestionsFlow(input);
}

// The AI is prompted in English for higher quality responses.
const prompt = ai.definePrompt({
  name: 'answerDocumentQuestionsPrompt',
  input: {schema: z.object({
    documentText: z.string(),
    question: z.string(),
  })},
  output: {schema: AnswerDocumentQuestionsOutputSchema},
  prompt: `You are an AI assistant and expert legal analyst. Your task is to answer the user's question based *only* on the provided legal document. Provide a clear, concise, and easy-to-understand answer for a non-lawyer.

If the user's question is too generic or broad (e.g., "what is this document about?", "what's in it?"), do not say you cannot answer. Instead, provide a brief, high-level summary of the document as the answer.

Document Text: {{{documentText}}}

Question: {{{question}}}

Answer in English:`,
});

const answerDocumentQuestionsFlow = ai.defineFlow(
  {
    name: 'answerDocumentQuestionsFlow',
    inputSchema: AnswerDocumentQuestionsInputSchema,
    outputSchema: AnswerDocumentQuestionsOutputSchema,
  },
  async ({documentText, question, language}) => {
    // Translate the user's question to English for the AI.
    const translatedQuestion = await translateText(question, 'en');

    // Get the answer from the AI in English.
    const {output} = await prompt({ documentText, question: translatedQuestion });
    
    if (!output?.answer) {
        return { answer: '' };
    }

    // Translate the AI's English answer back to the user's target language.
    const translatedAnswer = await translateText(output.answer, language);
    
    return { answer: translatedAnswer };
  }
);
