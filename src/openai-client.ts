import OpenAI from 'openai';

const openAIKey = import.meta.env.VITE_OPENAI_KEY;

export const openai = new OpenAI({
  apiKey: openAIKey,
  dangerouslyAllowBrowser: true,
});
