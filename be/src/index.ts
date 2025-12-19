import 'dotenv/config';
import express from 'express';
import { GoogleGenAI } from "@google/genai";
import { BASE_PROMPT, getSystemPrompt } from "./prompt";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const app = express();
app.use(express.json());

app.post('/template', async (req, res) => {
  const prompt = req.body.prompt;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { 
        parts: [{ 
          text: `IMPORTANT: You must respond with ONLY a single word: either "node" or "react". Do not return any code, files, explanations, or any other text. Just return the single word.

Based on this project, which should it be - node or react?

${prompt}` 
        }], 
        role: 'user' 
      }
    ],
  });
  const answer = (response.text || '').trim().toLowerCase();
  console.log('API Response:', response.text);
  console.log('Processed answer:', answer);
  if (answer === "react") {
    res.json({
      prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [reactBasePrompt]
    })
    return;
  }

  if (answer === "node") {
    res.json({
      prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [nodeBasePrompt]
    })
    return;
  }

  res.status(403).json({ message: "You cant access this" })
  return;
});

app.post("/chat", async (req, res) => {
  const messages = req.body.messages;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { parts: [{ text: getSystemPrompt() }], role: 'model' },
      { parts: [{ text: messages }], role: 'user' }
    ],
  })

  console.log(response);

  res.json({
      response: response.text
  });
})

app.listen(3001);
