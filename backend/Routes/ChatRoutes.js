// routes/chat.routes.js
const express = require('express');
const router = express.Router();
const chatController = require('../Controllers/ChatController');
const  verifyToken  = require('../Middleware/auth')

// Get or create a conversation with the post creator
router.get('/conversation/:postId', verifyToken, chatController.getOrCreateConversation);

// Send a new message
router.post('/send', verifyToken, chatController.sendMessage);

// Get all messages for a specific conversation
router.get('/:conversationId/messages', verifyToken, chatController.getMessages);

router.post('/add-to-list', verifyToken, chatController.addToChatList);
// Get the chat list for the authenticated user
router.get('/list', verifyToken, chatController.getChatList);

module.exports = router;
