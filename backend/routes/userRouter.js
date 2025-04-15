const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
const { isAuthenticated, isGuest } = require("../middleware/authMiddleware");

userRouter.post("/register", isGuest, userController.registerNewUser);
userRouter.post("/login", isGuest, userController.loginUser);
// userRouter.get("/:id", isAuthenticated, userController.getUserProfile);
// userRouter.delete("/:id", isAuthenticated, userController.deleteUser);
// userRouter.put("/:id", isAuthenticated, userController.updateUserProfile);

module.exports = userRouter;
