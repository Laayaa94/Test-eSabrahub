const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const userRoutes = require('./Routes/Auth');
const postRoutes = require('./Routes/PostRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// Ensure upload directories exist
const ensureUploadDirsExist = () => {
  const photoDir = path.join(__dirname, 'uploads', 'photos');
  const videoDir = path.join(__dirname, 'uploads', 'videos');
  
  if (!fs.existsSync(photoDir)) {
    fs.mkdirSync(photoDir, { recursive: true });
  }
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }
};

ensureUploadDirsExist();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'uploads/';
    if (file.fieldname === 'photos') {
      folder += 'photos/';
    } else if (file.fieldname === 'videos') {
      folder += 'videos/';
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Apply routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
