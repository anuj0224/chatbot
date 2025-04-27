const express = require('express');
const {sendMessageToAI} = require('../controller/reponse.controller'); // Adjust the path as necessary

const router = express.Router();

// Controller for chatbot response

// Route to handle chatbot responses
router.post('/chat', sendMessageToAI);

module.exports = router;