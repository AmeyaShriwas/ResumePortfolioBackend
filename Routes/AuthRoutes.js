const express = require('express');
const AuthController = require('./../Controller/AuthController');
const Auth = require('./../Middleware/Auth')

const Router = express.Router();

Router.post('/login', AuthController.LoginController);
Router.post('/signup', AuthController.SignupController);
Router.post('/forgot-password', AuthController.ForgotPasswordController);
Router.post('/update-password', AuthController.UpdatePasswordController);
Router.post('/verify-otp', AuthController.VerifyOTPController);

module.exports = Router;
