const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified:{type: Boolean, default:false},
    otp: { type: String, default: null },
    ResumeDetails: {type: Object},
    PortfolioDetails: {type: Object}
});

module.exports = mongoose.model('User', UserSchema);
