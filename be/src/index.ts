require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function main() {
  const model = 'gemini-2.5-flash';
  const prompt = 'Explain how the solar system formed in simple terms.';

  try {
    console.log('Starting streaming response...\n');
    
    // Method 1: Using generateContentStream (streaming)
    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: prompt,
    });

    // Iterate over chunks as they arrive
    for await (const chunk of responseStream) {
      // Handle different chunk types
      if (chunk.text) {
        // Write text chunks directly to stdout for real-time display
        process.stdout.write(chunk.text);
      } else if (chunk.candidates && chunk.candidates[0]?.content?.parts) {
        // Alternative: extract text from candidates structure
        const text = chunk.candidates[0].content.parts
          .map((part: any) => part.text)
          .filter(Boolean)
          .join('');
        if (text) {
          process.stdout.write(text);
        }
      }
    }
    
    console.log('\n\n✅ Stream completed successfully!');

  } catch (error) {
    console.error('❌ Error during streaming:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
}

main();

