const AuthServices = require('./../Services/AuthServices');

const LoginController = async (req, res) => {
    try {
        const response = await AuthServices.LoginService(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const SignupController = async (req, res) => {
    console.log('b', req.body)
    try {
        const response = await AuthServices.SignupService(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const ForgotPasswordController = async (req, res) => {
    try {
        const response = await AuthServices.ForgotPasswordService(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdatePasswordController = async (req, res) => {
    try {
        const response = await AuthServices.UpdatePasswordService(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const VerifyOTPController = async (req, res) => {
    try {
        const response = await AuthServices.VerifyOTPService(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    LoginController,
    SignupController,
    ForgotPasswordController,
    UpdatePasswordController,
    VerifyOTPController
};
