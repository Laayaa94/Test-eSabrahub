// controllers/chat.controller.js
const ChatMessage = require('../Models/ChatMessage');
const Conversation = require('../Models/Conversation');
const User = require('../Models/User');
const Post =require('../Models/Post')

// Get or create a conversation with the post creator
exports.getOrCreateConversation = async (req, res) => {
  try {
    console.log("Received request to get or create conversation");
    const { postId } = req.params;
    const userId = req.user._id; // Use req.user._id to get the authenticated user ID

    console.log(`Post ID: ${postId}`);
    console.log(`User ID: ${userId}`);

    // Find the post creator
    const post = await Post.findById(postId).populate('user'); // Use 'user' to populate the creator
    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ error: 'Post not found' });
    }

    const postCreatorId = post.user._id; // Access the user field to get the post creator ID

    // Check if a conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, postCreatorId] }
    });

    if (!conversation) {
      // Create a new conversation if it doesn't exist
      conversation = new Conversation({
        participants: [userId, postCreatorId]
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error in getOrCreateConversation:', error);
    res.status(500).json({ error: 'Failed to retrieve or create conversation' });
  }
};

// Send a new message
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message, conversationId } = req.body;

    // Validate the conversation ID
    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID is required' });
    }

    // Create and save the new message
    const newMessage = new ChatMessage({
      sender: senderId,
      receiver: receiverId,
      message,
      conversation: conversationId,
    });
    await newMessage.save();

    // Update the last message in the conversation
    const conversation = await Conversation.findById(conversationId);
    conversation.lastMessage = newMessage._id;
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};
// Add user to chat list if not already present
exports.addToChatList = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id; // Get the authenticated user ID

    // Find the post creator
    const post = await Post.findById(postId).populate('user');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const postCreatorId = post.user._id;

    // Check if the conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, postCreatorId] }
    });

    if (!conversation) {
      // Create a new conversation if it doesn't exist
      conversation = new Conversation({
        participants: [userId, postCreatorId]
      });
      await conversation.save();
    }

    // Ensure the post creator is in the authenticated user's chat list
    const user = await User.findById(userId);
    if (!user.chatList.includes(postCreatorId)) {
      user.chatList.push(postCreatorId);
      await user.save();
    }

    res.status(200).json({ message: 'User added to chat list', conversation });
  } catch (error) {
    console.error('Error adding user to chat list:', error);
    res.status(500).json({ error: 'Failed to add user to chat list' });
  }
};

// Get all messages for a specific conversation
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await ChatMessage.find({ conversation: conversationId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
exports.getChatList = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("User ID:", userId);

    const conversations = await Conversation.find({ participants: userId })
      .populate({
        path: 'participants',
        select: 'username profileImage', // Include profileImage in the query
      })
      .populate('lastMessage') // Include last message if needed
      .sort({ updatedAt: -1 });

    console.log("Conversations:", conversations);
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error retrieving chat list:", error);
    res.status(500).json({ error: 'Failed to retrieve chat list' });
  }
};
