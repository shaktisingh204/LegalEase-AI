/**
 * @fileoverview Service for translating text using Google Cloud Translate.
 */
'use server';

import {Translate} from '@google-cloud/translate/build/src/v2';

let translate: Translate | null = null;

/**
 * Translates text to a target language.
 * @param text The text to translate.
 * @param targetLanguage The target language code (e.g., 'en', 'hi').
 * @returns The translated text.
 */
export async function translateText(
  text: string,
  targetLanguage: string
): Promise<string> {
  // If the text is empty or there's no target language, do nothing.
  if (!text || !targetLanguage) {
    return text;
  }
  
  if (!process.env.GOOGLE_CLOUD_PROJECT) {
      throw new Error('The GOOGLE_CLOUD_PROJECT environment variable is not set.');
  }

  if (!translate) {
    translate = new Translate();
  }

  try {
    const [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error) {
    console.error('Error calling Translate API:', error);
    if (error instanceof Error) {
        throw new Error(`Translate API Error: ${error.message}`);
    }
    throw new Error('Failed to translate text using Translate API.');
  }
}
