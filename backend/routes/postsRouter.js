const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const {
    authenticateJWT,
    isAdmin,
    isAuthenticated,
} = require("../middleware/authMiddleware");

postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:id", postsController.getSinglePostById);

module.exports = postsRouter;
