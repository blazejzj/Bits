const { Router } = require("express");
const postsRouter = Router();
const {
    authenticateJWT,
    isAuthenticated,
    isAdmin,
} = require("../middleware/authMiddleware");
const postsController = require("../controllers/postsController");
const commentController = require("../controllers/commentController");
const responseController = require("../controllers/responseController");
const categoryController = require("../controllers/categoryController");

// posts
postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/category", categoryController.getCategories);
postsRouter.get("/:id", postsController.getSinglePostById);

// category

// admin
postsRouter.post(
    "/category/new",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    categoryController.createNewCategory
);
postsRouter.patch(
    "/category/:name/update",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    categoryController.updateCategory
);
postsRouter.post(
    "/category/:name/delete",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    categoryController.deleteCategory
);

postsRouter.post(
    "/create",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    postsController.createNewPost
);

postsRouter.post(
    "/delete/:id",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    postsController.deletePost
);

postsRouter.put(
    "/update/:id",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    postsController.updatePost
);

postsRouter.post(
    "/publish/:id",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    postsController.publishPost
);

postsRouter.post(
    "/unpublish/:id",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    postsController.unpublishPost
);

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
