const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGemini3() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const systemInstruction = {
      role: "system",
      parts: [{ text: "You are a helpful tutor." }]
    };

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction
    });
    
    console.log("Attempting to generate content with gemini-3-flash-preview...");
    const result = await model.generateContent("Hello, who are you?");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error details:", error);
  }
}

testGemini3();
