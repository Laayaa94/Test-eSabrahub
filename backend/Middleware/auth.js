// middleware/authenticateUser.js

const jwt = require('jsonwebtoken');
const User = require('../Models/User'); // Adjust the path as necessary

const authenticateUser = async (req, res, next) => {
  try {
    // Check if Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];
    console.log("Token received:", token); // Log token for debugging

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decodedToken); // Log decoded token for debugging

    // Find user by ID from decoded token
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    console.log("Authenticated user:", req.user); // Log user for debugging

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

module.exports = authenticateUser;
