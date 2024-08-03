const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure environment variables are loaded

// Configure Nodemailer directly in the route file
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/send', (req, res) => {
  const { fullName, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'Contact Us Form Submission',
    text: `Full Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Message sent: ' + info.response);
  });
});

module.exports = router;
