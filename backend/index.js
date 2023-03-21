// Import required libraries
const express = require('express');
const axios = require('axios');
const openai = require('openai');
require('dotenv').config();

// Initialize express app and openai
const app = express();
openai.apiKey = process.env.OPENAI_API_KEY;

// Middleware for parsing JSON
app.use(express.json());

// Endpoint for chat messages
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Call OpenAI API with the message
    openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Who won the world series in 2020?"},
            {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
            {"role": "user", "content": "Where was it played?"}
        ]
    )
    // Extract and send the AI's response
    const aiResponse = response.choices[0].text.trim();
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});