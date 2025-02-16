const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Access Denied. No token provided' });
        }

        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified; // Attach user data to request
        next(); // Proceed to the next middleware or route
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = AuthMiddleware;
