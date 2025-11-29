import { GoogleGenAI } from "@google/genai";
import { Rule, StoreSettings } from '../types';

export const generateSmartReply = async (
  userMessage: string,
  settings: StoreSettings,
  rules: Rule[]
): Promise<string> => {
  // Check for API Key safely using the injected value from Vite
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
    console.warn("Gemini API Key is missing or invalid.");
    return "Error: API Key is missing. Please configure it in your Vercel project settings.";
  }

  try {
    // Initialize client only when needed
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const ruleContext = rules
      .map(r => `If user asks about [${r.keywords.join(', ')}], the policy is: "${r.response}"`)
      .join('\n');

    const systemPrompt = `
      You are a customer support agent for an e-commerce store named "${settings.storeName}".
      
      Your Role:
      ${settings.aiPersona}

      Context & Policies:
      ${ruleContext}

      Instructions:
      - Answer the user's message politely and concisely.
      - If the user asks for something outside your knowledge, ask them to contact human support.
      - Keep responses short, similar to a WhatsApp message.
      - You can reply in the language the user uses (English, French, Arabic, Darija, etc.).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 150,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    return response.text || "I'm having trouble thinking of a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am currently offline (AI Error).";
  }
};