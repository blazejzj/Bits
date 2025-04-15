const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const {
    authenticateJWT,
    isAdmin,
    isAuthenticated,
} = require("../middleware/authMiddleware");

// posts
postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:id", postsController.getSinglePostById);

// comments
// TODO : commentsController here + authentication
postsRouter.get("/:id/comments", postsController.getAllPostsComments);
// postsRouter.post("/:id/comments")
// postsRouter.patch("/:id/comments/:commentId")
// postsRouter.delete("/id/comments/:commentId")

// responses
// TODO: responseController here + authentication
// postsRouter.post("/:id/comments/:commentId") // post response to a comment
// postsRouter.patch("/:id/comments/:commentId/:responseId") // update response
// postsRouter.delete("/id/comments/:commentId/:responseId") // delete a resposne

module.exports = postsRouter;
