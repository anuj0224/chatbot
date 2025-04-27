const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.post("/chat", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required." });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o", // switched to GPT-4o as in your reference
        messages: [
          { role: "user", content: question },
        ],
        temperature: 0.7,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourwebsite.com", // Replace with your actual domain
          "X-Title": "ChatbotProject", // Optional, shows on OpenRouter rankings
        },
      }
    );

    const aiAnswer = response.data.choices[0].message.content || "No response";
    res.json({ answer: aiAnswer });
  } catch (error) {
    console.error(
      "OpenRouter API error:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: "Failed to get response from OpenRouter AI" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
