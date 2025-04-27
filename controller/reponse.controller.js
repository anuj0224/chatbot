const axios = require('axios');
const Chat = require('../models/saveResponse');

const sendMessageToAI = async (req, res) => {
  const { question,userId } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/llama-3.1-nemotron-nano-8b-v1:free",
        messages: [{ role: "user", content: question }],
        temperature: 0.7,   
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourwebsite.com",
          "X-Title": "ChatbotProject",
        },
      }
    );

    const aiAnswer = response.data.choices[0].message.content || "No response";

    // Save to MongoDB
    const newChat = new Chat({ question, answer: aiAnswer, userId: userId });
    await newChat.save();

    res.json({ answer: aiAnswer });
  } catch (error) {
    console.error("OpenRouter API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from OpenRouter AI" });
  }
};

module.exports = {
  sendMessageToAI,
};
