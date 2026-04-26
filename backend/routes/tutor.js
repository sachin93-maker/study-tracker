const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { protect } = require('../middleware/authMiddleware');

router.post('/ask', protect, async (req, res) => {
  const { prompt, history } = req.body;
  
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return res.json({ 
      text: "Hello! I am your AI Study Assistant. To fully activate my capabilities, please add a valid `GEMINI_API_KEY` to your backend `.env` file! For now, I'm running in mock mode. What would you like to learn today?" 
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Prepend system prompt to guide the AI
    const systemInstruction = {
      role: "system",
      parts: [{ text: "You are an expert AI Study Assistant and Tutor acting inside the 'Study Tracker' platform. Your goal is to provide step-by-step, high-clarity solutions to academic questions.\n\nFormatting Requirements:\n1. Use clear Markdown headings (###) and subheadings to organize information.\n2. Use bullet points or numbered lists for steps and key points to improve readability.\n3. For mathematical expressions or formulas, use clear and properly spaced notation (LaTeX format is preferred). Explain each variable and the logic behind the formula.\n4. Avoid raw or cluttered text blocks; prioritize logical flow and white space.\n5. Keep your tone encouraging, professional, and concise while ensuring full understanding.\n6. Format all responses in clear, structured Markdown." }]
    };

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction
    });
    
    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(prompt);
    const text = result.response.text();

    res.json({ text });
  } catch (error) {
    console.error('AI Tutor Error Details:', error.message);
    res.status(500).json({ 
      error: "Failed to communicate with AI Tutor.",
      details: error.message 
    });
  }
});

module.exports = router;
