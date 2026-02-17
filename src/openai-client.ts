import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: 'you-api-key',
  dangerouslyAllowBrowser: true,
});
