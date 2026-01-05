
// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json());

// POST route to handle the /ask request
app.post('/ask', async (req, res) => {
    const userQuestion = req.body.question;

    if (!userQuestion) {
        return res.status(400).json({ error: 'Question is required' });
    }

    try {
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            contents: [{
                parts: [{
                    text: userQuestion
                }]
            }]
        });

        // Extract the generated text from the response
        const generatedText = response.data.candidates[0].content.parts[0].text;
        res.json({ answer: generatedText });

    } catch (error) {
        console.error('Error calling Gemini API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get answer from Gemini API' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
