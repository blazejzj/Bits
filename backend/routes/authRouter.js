const { Router } = require("express");
const authRouter = Router();

const authController = require("../controllers/authController");
const {
    isGuest,
    authenticateJWT,
    isAuthenticated,
} = require("../middleware/authMiddleware");

authRouter.post("/login/admin", isGuest, authController.loginAdmin);
authRouter.post("/register", isGuest, authController.registerNewUser);
authRouter.post("/login", isGuest, authController.loginUser);
authRouter.post(
    "/logout",
    authenticateJWT,
    isAuthenticated,
    authController.logOut
);

module.exports = authRouter;
