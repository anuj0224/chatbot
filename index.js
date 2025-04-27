// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // for environment variables
const connectDB = require('./db/db'); // Import the database connection
const app = express();
const port = process.env.PORT; // You can change this

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});
// POST API to receive user questions
app.post('/chat', async (req, res) => {
    const { question } = req.body;
  
    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }
  
    try {
      const response = await axios.post(
        'https://api.deepseek.com/v1/chat/completions', // correct endpoint
        {
          model: "deepseek-chat", // you must specify model
          messages: [
            { role: "system", content: "Summarize smartly in 2 lines" },
            { role: "user", content: question }
          ],
          temperature: 0.3,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, // better to keep token in env
            'Content-Type': 'application/json',
          },
        }
      );
  
      const aiAnswer = response.data.choices[0].message.content || "No response";
      res.json({ answer: aiAnswer });
    } catch (error) {
      console.error('DeepSeek API error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to get response from DeepSeek AI' });
    }
  });
  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});