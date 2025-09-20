/**
 * @fileoverview Service for performing OCR using Google Cloud Document AI.
 */
'use server';

import {DocumentProcessorServiceClient} from '@google-cloud/documentai';

/**
 * Extracts text from a document using the Google Cloud Document AI API.
 * @param dataUri - The document data URI.
 * @returns The extracted text.
 */
export async function extractTextFromImage(dataUri: string): Promise<string> {
  const location = process.env.DOCUMENT_AI_LOCATION;
  const processorId = process.env.DOCUMENT_AI_PROCESSOR_ID;
  const projectId = process.env.GOOGLE_CLOUD_PROJECT;

  if (!processorId || !location || !projectId) {
    throw new Error(
      'DOCUMENT_AI_PROCESSOR_ID, DOCUMENT_AI_LOCATION, or GOOGLE_CLOUD_PROJECT environment variable not set.'
    );
  }

  const client = new DocumentProcessorServiceClient({
    apiEndpoint: `${location}-documentai.googleapis.com`,
  });

  const match = dataUri.match(/^data:(.*);base64,(.*)$/);
  if (!match) {
    throw new Error('Invalid data URI format.');
  }
  const mimeType = match[1];
  const base64Data = match[2];

  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  const request = {
    name,
    rawDocument: {
      content: base64Data,
      mimeType: mimeType,
    },
  };

  try {
    const [result] = await client.processDocument(request);
    const { document } = result;

    if (!document || !document.text) {
      return '';
    }
    
    return document.text;

  } catch (error) {
    console.error('Error calling Document AI API:', error);
    if (error instanceof Error && 'message' in error) {
        throw new Error(`Document AI API Error: ${error.message}`);
    }
    throw new Error('Failed to extract text using Document AI API.');
  }
}
