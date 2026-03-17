import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  prepTime: string;
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
  calories: number;
  estimatedCost?: string; // e.g., "Low", "Medium", "High"
}

export interface MealPlan {
  daily: Recipe[];
  weekly: {
    day: string;
    recipes: Recipe[];
  }[];
}

export const generateRecipeFromIngredients = async (ingredients: string[], dietaryPreference?: string): Promise<Recipe> => {
  const dietaryContext = dietaryPreference && dietaryPreference !== 'None' ? ` The recipe MUST be ${dietaryPreference}.` : '';
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Suggest a creative and delicious recipe using these ingredients: ${ingredients.join(", ")}.${dietaryContext} 
    Focus on Indian household context and budget-friendliness where possible. 
    You can assume basic pantry staples (oil, salt, pepper, water, basic spices) are available.
    Provide an estimated cost per serving in Indian Rupees (INR).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          prepTime: { type: Type.STRING },
          cookTime: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
          calories: { type: Type.NUMBER },
          estimatedCost: { type: Type.STRING },
        },
        required: ["name", "description", "ingredients", "steps", "prepTime", "cookTime", "difficulty", "calories", "estimatedCost"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};

export const generateMealPlan = async (type: 'daily' | 'weekly'): Promise<MealPlan> => {
  const prompt = type === 'daily' 
    ? "Suggest 3 budget-friendly Indian recipes for a single day (Breakfast, Lunch, Dinner) using common Indian household ingredients. Provide estimated cost per serving in Indian Rupees (INR)."
    : "Suggest a weekly meal plan (7 days) with 2 budget-friendly Indian recipes per day (Lunch, Dinner) using common Indian household ingredients. Provide estimated cost per serving in Indian Rupees (INR).";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          daily: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                prepTime: { type: Type.STRING },
                cookTime: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                calories: { type: Type.NUMBER },
                estimatedCost: { type: Type.STRING },
              },
              required: ["name", "description", "ingredients", "steps", "prepTime", "cookTime", "difficulty", "calories", "estimatedCost"]
            }
          },
          weekly: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                recipes: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                      steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                      prepTime: { type: Type.STRING },
                      cookTime: { type: Type.STRING },
                      difficulty: { type: Type.STRING },
                      calories: { type: Type.NUMBER },
                      estimatedCost: { type: Type.STRING },
                    },
                    required: ["name", "description", "ingredients", "steps", "prepTime", "cookTime", "difficulty", "calories", "estimatedCost"]
                  }
                }
              },
              required: ["day", "recipes"]
            }
          }
        },
        required: type === 'daily' ? ["daily"] : ["weekly"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const getChefAdvice = async (question: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: question,
    config: {
      systemInstruction: "You are a world-class professional chef. Provide concise, expert culinary advice, tips, and answers to cooking questions. Keep it encouraging and practical.",
    },
  });

  return response.text || "I'm sorry, I couldn't find an answer to that.";
};
