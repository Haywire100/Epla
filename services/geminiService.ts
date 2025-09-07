
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateRecipe = async (ingredients: string[]): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API Key not configured. Please set up your environment.");
  }

  if (ingredients.length === 0) {
    return Promise.resolve("Please add some items to your cart to generate a recipe.");
  }

  const prompt = `
You are a creative chef specializing in simple, healthy meals using fresh, farm-to-table ingredients. Your goal is to inspire home cooks.

Based on the following ingredients, create a delicious recipe: ${ingredients.join(', ')}.

Your response must be in Markdown format and include the following sections:
- A catchy and descriptive recipe **Title**.
- A brief, enticing **Description** (1-2 sentences).
- An **Ingredients** list (including the ones provided and any other common pantry staples needed).
- Step-by-step **Instructions**.
- An optional **Chef's Tip** for variations or serving suggestions.

Make the recipe easy to follow for a beginner cook.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return "Sorry, I couldn't come up with a recipe right now. Please try again later.";
  }
};
