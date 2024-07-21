const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const path = require('path');
const fs = require('fs');
const userRoutes = require('./Routes/Auth');


// Middleware
app.use(cors());
app.use(express.json());

// Apply authentication middleware globally

// User Routes
app.use('/api/users', userRoutes);

// MongoDB Connection
  mongoose.connect(`mongodb+srv://prabodaharshani95:Mongo94@esabratest.vocqobw.mongodb.net/esabra`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

// Check database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
