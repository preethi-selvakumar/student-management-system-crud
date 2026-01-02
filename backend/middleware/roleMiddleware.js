const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        // Checking if the user role from the token matches the required role
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: "Access Denied: Admins only" });
        }
        next();
    };
};

module.exports = roleMiddleware;