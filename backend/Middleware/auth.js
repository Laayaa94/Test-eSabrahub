// middleware/authenticateUser.js

const jwt = require('jsonwebtoken');
const User = require('../Models/User'); // Adjust the path as necessary

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token format: Bearer <token>
    console.log("Token received:", token); // Log token for debugging
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decodedToken); // Log decoded token for debugging
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    console.log("Authenticated user:", req.user); // Log user for debugging
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

module.exports = authenticateUser;