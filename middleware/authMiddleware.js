const jwt = require('jsonwebtoken');
require("dotenv").config();
const getUserIdFromToken = (req, res, next) => {
    // Extract token from the cookies
    const token = req.cookies.uid;  
    const secretKey = process.env.JWT_SECRET ;

    if (!token) {
        return res.status(401).redirect('/login').json({ message: 'Authentication token is missing' });
    }

    try {
        const payload = jwt.verify(token, secretKey);
        req.user_id = payload.user_id;  
        next();
    } catch (error) {
        return res.status(401).redirect('/login').json({ message: 'token invalid or expires ' });
    }
};

module.exports = getUserIdFromToken;
