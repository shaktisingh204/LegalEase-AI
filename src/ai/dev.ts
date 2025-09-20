import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-uploaded-document.ts';
import '@/ai/flows/generate-plain-language-summary.ts';
import '@/ai/flows/answer-document-questions.ts';
import '@/ai/flows/extract-text-from-document.ts';
import '@/services/ocr';
import '@/services/translate';
