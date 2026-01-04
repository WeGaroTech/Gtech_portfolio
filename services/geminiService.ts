
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client using the API key strictly from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTeamBriefing = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the lead AI analyst for "GTech", a high-performance startup founding squad.
      Founders: 
      - Cheangchang (Co-founder, DevOps & Security, Rust specialist)
      - Jerry (Co-founder, Infrastructure, Linux & Python specialist)
      - Chingbat (Co-founder, Lead Designer, Linguist, Music producer)
      
      User query: "${query}"
      Provide a short, punchy, high-intensity response (under 100 words). 
      Use tactical jargon related to Rust, Linux kernels, design systems, and music synthesis. 
      Sound like a command center for an elite startup unit on the verge of disruption.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      },
    });
    
    // Accessing the .text property directly as per coding guidelines (not a method call).
    return response.text || "No briefing received from the founding hub.";
  } catch (error) {
    console.error("Gemini Briefing Error:", error);
    return "Stealth link disrupted. Unable to retrieve founding briefing.";
  }
};
