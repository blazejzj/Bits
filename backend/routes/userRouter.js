const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");
// const { isAuthenticated } = require("../middleware/authMiddleware");

userRouter.post("/", userController.createNewUser);
// userRouter.get("/:id", isAuthenticated, userController.getUserProfile);
// userRouter.delete("/:id", isAuthenticated, userController.deleteUser);
// userRouter.put("/:id", isAuthenticated, userController.updateUserProfile);

module.exports = userRouter;
