const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    // Extracting token from the authorization header
    const token = req.header("authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "access denied" });
    }

    try {
        // Verifying the token using the secret key from environment variables
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attaching user data (id and role) to the request object
        next();
    } catch (err) {
        res.status(400).json({ message: "invalid token" });
    }
};

module.exports = authMiddleware;