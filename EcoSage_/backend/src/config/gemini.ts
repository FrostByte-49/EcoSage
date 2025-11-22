import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

if (!GEMINI_API_KEY) {
  console.warn('⚠️  GEMINI_API_KEY not found in environment variables');
}

export const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Using Gemini 1.5 Flash for vision tasks (fast and cost-effective)
export const visionModel = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    maxOutputTokens: 2048,
  }
});