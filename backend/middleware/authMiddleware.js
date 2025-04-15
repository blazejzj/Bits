const passport = require("passport");

const authenticateJWT = passport.authenticate("jwt", { session: false });

function isAuthenticated(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated." });
    }
    next();
}

function isAdmin(req, res, next) {
    if (!req.user || req.user.role !== "ADMIN") {
        return res
            .status(403)
            .json({ message: "No permission to access this resource." });
    }
    next();
}

function isGuest(req, res, next) {
    const token = req.cookies && req.cookies["token"];
    if (token) {
        return res.status(400).json({ message: "User already authenticated." });
    }

    next();
}

module.exports = {
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    isGuest,
};
