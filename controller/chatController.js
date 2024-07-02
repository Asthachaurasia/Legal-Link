const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');

// List available attorneys
router.get('/attorneys', authMiddleware, async (req, res) => {
    const attorneys = await User.find({ role: 'attorney' }).select('-password');
    res.status(200).json(attorneys);
});

// Start a chat with an attorney
router.post('/start', authMiddleware, async (req, res) => {
    const { attorneyId } = req.body;
    const chat = new Chat({ userId: req.user.userId, attorneyId });
    await chat.save();
    res.status(201).json(chat);
});

// Get chat messages
router.get('/:chatId', authMiddleware, async (req, res) => {
    const chat = await Chat.findById(req.params.chatId).populate('messages.sender', 'username');
    res.status(200).json(chat);
});

module.exports = router;
