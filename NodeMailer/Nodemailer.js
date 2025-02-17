const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// Transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,      // Use environment variables for security
        pass: process.env.PASSWORD
    }
});

// Function to generate OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999);  // Generate a 6-digit OTP
};

// Function to send OTP to email
const sendOtpToMail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP for registration is ${otp}`  // OTP in email body
    };

    // Return a Promise to handle success/failure response
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);  // Reject the promise if error occurs
            }
            resolve(info);  // Resolve the promise with the info on success
        });
    });
};

module.exports = sendOtpToMail;
