const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy to get started? No, use the client.
    // Actually the SDK has a way to list models.
    // In @google/generative-ai, listing models is usually done via the underlying client or by checking docs.
    // Let's try to just use 'gemini-1.5-flash' again but maybe check if there is a typo.
    console.log("Listing models is not directly exposed in the high-level SDK as a simple listModels() on the main class in some versions.");
    console.log("Attempting to initialize 'gemini-1.5-flash'...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("test");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error details:", error);
  }
}

listModels();
