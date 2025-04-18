const { Router } = require("express");
const postsRouter = Router();
const {
    authenticateJWT,
    isAuthenticated,
} = require("../middleware/authMiddleware");
const postsController = require("../controllers/postsController");
const commentController = require("../controllers/commentController");
const responseController = require("../controllers/responseController");

// posts
postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:id", postsController.getSinglePostById);

// comments
postsRouter.get("/:id/comments", commentController.getAllPostsComments);
postsRouter.post(
    "/:id/comments",
    authenticateJWT,
    isAuthenticated,
    commentController.postComment
);
postsRouter.patch(
    "/:id/comments/:commentId",
    authenticateJWT,
    isAuthenticated,
    commentController.updateComment
);
postsRouter.delete(
    "/:id/comments/:commentId",
    authenticateJWT,
    isAuthenticated,
    commentController.deleteComment
);

// responses
postsRouter.post(
    "/:id/comments/:commentId",
    authenticateJWT,
    isAuthenticated,
    responseController.postResponse
);
postsRouter.patch(
    "/:id/comments/:commentId/:responseId",
    authenticateJWT,
    isAuthenticated,
    responseController.updateResponse
);
postsRouter.delete(
    "/:id/comments/:commentId/:responseId",
    authenticateJWT,
    isAuthenticated,
    responseController.deleteResponse
);

module.exports = postsRouter;
