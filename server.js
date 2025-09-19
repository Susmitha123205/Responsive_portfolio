const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'susmithaboga373@gmail.com',
        pass: 'abcdefghijklmnop'   // 16-char App Password
    }
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.log('Transporter Error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// Route to handle form submission
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
    from: 'susmithaboga373@gmail.com',  // Must match auth.user
    replyTo: email,                      // Sender email from form
    to: 'susmithaboga373@gmail.com',     // Your receiving email
    subject: `New Message from ${name}`,
    text: message
};


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error Details:', error);
            return res.status(500).send('Error sending message. Check console for details.');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Message sent successfully!');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
