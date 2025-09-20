/**
 * @fileoverview Service for interacting with Google Cloud Storage.
 */
'use server';

import { Storage } from '@google-cloud/storage';

const storage = new Storage();

/**
 * Uploads a file to a Google Cloud Storage bucket.
 * @param dataUri - The data URI of the file to upload.
 * @param destination - The destination path in the bucket.
 * @returns The public URL of the uploaded file.
 */
export async function uploadToGcs(dataUri: string, destination: string): Promise<string> {
  const bucketName = process.env.GCS_BUCKET_NAME;

  if (!bucketName) {
    throw new Error('GCS_BUCKET_NAME environment variable not set.');
  }

  const match = dataUri.match(/^data:(.*);base64,(.*)$/);
  if (!match) {
    throw new Error('Invalid data URI format.');
  }
  const mimeType = match[1];
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, 'base64');

  const bucket = storage.bucket(bucketName);
  const file = bucket.file(destination);

  try {
    await file.save(buffer, {
      metadata: { contentType: mimeType },
    });
    return `gs://${bucketName}/${destination}`;
  } catch (error) {
    console.error('Failed to upload to GCS:', error);
    if (error instanceof Error) {
        throw new Error(`GCS Upload Error: ${error.message}`);
    }
    throw new Error('Failed to upload file to Google Cloud Storage.');
  }
}
