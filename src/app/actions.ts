'use server';

import {
  summarizeUploadedDocument,
  generatePlainLanguageSummary,
  answerDocumentQuestions,
  extractTextFromDocument,
} from '@/ai/flows';

export async function extractText(documentDataUri: string) {
  const result = await extractTextFromDocument({ documentDataUri });
  return result.text;
}

export async function getSummaries(documentText: string, language: string) {
  // Use Promise.all to run them concurrently
  const [summaryResult, plainLanguageResult] = await Promise.all([
    summarizeUploadedDocument({ text: documentText, language }),
    generatePlainLanguageSummary({ text: documentText, language }),
  ]);

  return {
    summary: summaryResult.summary,
    plainLanguageSummary: plainLanguageResult.summary,
  };
}

export async function answerQuestion(documentText: string, question: string, language: string) {
  const result = await answerDocumentQuestions({ documentText, question, language });
  return result.answer;
}
