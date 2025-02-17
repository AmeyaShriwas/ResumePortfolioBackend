const User = require('./../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const LoginService = async (data) => {
    try {
        const user = await User.findOne({ email: data.email });
        if (!user) throw new Error('User not found');

        if (!user.isVerified) throw new Error('Account not verified. Please verify OTP.');

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const name = user.name
        const email = user.email

        return { status: true, message: 'Login successful', token, name, email };
    } catch (error) {
        throw error;
    }
};

const SignupService = async (data) => {
    try {
      console.log('data', data)
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const otp = Math.floor(100000 + Math.random() * 900000);

        const newUser = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            otp,
            isVerified: false // Default to false
        });
        const email = data.email

        return { status: true, message: 'Signup successful. Please verify your OTP.', email };
    } catch (error) {
        throw error;
    }
};

const ForgotPasswordService = async (data) => {
    try {
        const user = await User.findOne({ email: data.email });
        if (!user) throw new Error('User not found');

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        await user.save();

        return { status: true, message: 'OTP sent to email' };
    } catch (error) {
        throw error;
    }
};

const UpdatePasswordService = async (data) => {
    try {
        const user = await User.findOne({ email: data.email });
        if (!user) throw new Error('User not found');

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return { status: true, message: 'Password updated successfully' };
    } catch (error) {
        throw error;
    }
};

const VerifyOTPService = async (data) => {
    try {
        const user = await User.findOne({ email: data.email, otp: data.otp });
        if (!user) throw new Error('Invalid OTP');

        user.otp = null;
        user.isVerified = true; // ✅ Mark user as verified
        await user.save();

        return { status: true, message: 'OTP verified successfully. You can now log in.' };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    LoginService,
    SignupService,
    ForgotPasswordService,
    UpdatePasswordService,
    VerifyOTPService
};
