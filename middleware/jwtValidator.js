const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    console.log("token ::::: > ", token)
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET || jwtKey, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Unauthorized - Token expired" });
            } else {
                return res.status(403).json({ error: "Forbidden - Invalid token" });
            }
        }

        req.user = user;
        next(); // Call next() to move to the next middleware or route handler
    });
};

module.exports = { authenticateToken };
