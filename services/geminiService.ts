
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash-image';

export async function processImageWithAI(
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const firstPart = response.candidates?.[0]?.content?.parts?.[0];
    if (firstPart && firstPart.inlineData) {
      return firstPart.inlineData.data;
    } else {
      throw new Error("No image data received from the AI. The response might have been blocked.");
    }
  } catch (error) {
    console.error("Error processing image with AI:", error);
    throw new Error("Failed to process image with Gemini API. Please check the console for more details.");
  }
}
