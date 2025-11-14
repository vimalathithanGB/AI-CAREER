import { GoogleGenAI, Type } from "@google/genai";
import { CareerSuggestion } from "../types";

const getSkillLevelDescription = (level: number): string => {
  if (level < 33) return 'Beginner / Entry-Level';
  if (level < 66) return 'Intermediate / Some Experience';
  return 'Advanced / Expert';
};

export const getCareerSuggestions = async (
  interests: string,
  personality: string,
  skillLevel: number
): Promise<CareerSuggestion[]> => {
  // IMPORTANT: The API key must be set in the environment variables.
  // Do not hardcode the API key here.
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const skillLevelDescription = getSkillLevelDescription(skillLevel);

  // Fix: Refactored to use systemInstruction for better prompt structure.
  const systemInstruction = `You are an expert career counselor AI. You generate 5 diverse and actionable career path suggestions based on a user's profile.

For each suggestion, you must provide:
1. The name of the career.
2. A short, compelling description (2-3 sentences) of why this career is a good match for the user.
3. A typical salary range for this role in the USA.
4. The common educational requirements or path to entry.

You must return the response as a JSON object containing a single key "suggestions" which is an array of objects, strictly following the defined schema.`;

  const prompt = `Here is my profile:
- Interests: ${interests}
- Personality: ${personality}
- Skill Level: ${skillLevelDescription}`;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                career: {
                  type: Type.STRING,
                  description: "The name of the career path.",
                },
                description: {
                  type: Type.STRING,
                  description: "A short summary of why this career fits the user's profile.",
                },
                salaryRange: {
                  type: Type.STRING,
                  description: "A typical salary range, e.g., '$60,000 - $90,000 USD'.",
                },
                education: {
                  type: Type.STRING,
                  description: "Common educational requirements for this career.",
                },
              },
              required: ["career", "description", "salaryRange", "education"],
            },
          }
        },
        required: ["suggestions"],
      },
    }
  });

  const jsonText = response.text;
  if (!jsonText) {
    throw new Error("Received an empty response from the API.");
  }

  try {
    const parsed = JSON.parse(jsonText);
    return parsed.suggestions as CareerSuggestion[];
  } catch (e) {
    console.error("Failed to parse JSON response:", jsonText);
    throw new Error("The API returned an invalid format.");
  }
};
