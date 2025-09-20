import {genkit, Genkit} from 'genkit';
import {vertexAI} from '@genkit-ai/vertexai';

let aiInstance: Genkit | null = null;

export function getAi() {
  if (!aiInstance) {
    aiInstance = genkit({
      plugins: [vertexAI()],
      model: 'vertexai/gemini-2.5-flash',
    });
  }
  return aiInstance;
}
