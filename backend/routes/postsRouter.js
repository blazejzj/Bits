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

// posts
postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:id", postsController.getSinglePostById);

// category
postsRouter.get("/category", categoryController.getCategories);

// admin
postsRouter.post(
    "/category/new",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    categoryController.createNewCategory
);
postsRouter.patch(
    "/category/:name/update",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    categoryController.updateCategory
);
postsRouter.post(
    "/category/:name/delete",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    categoryController.deleteCategory
);

postsRouter.post(
    "/create",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    postsController.createNewPost
);

postsRouter.post(
    "/delete/:id",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    postsController.deletePost
);

postsRouter.put(
    "/update/:id",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    postsController.updatePost
);

postsRouter.post(
    "/publish/:id",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    postsController.publishPost
);

postsRouter.post(
    "/unpublish/:id",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    postsController.unpublishPost
);

postsRouter.post(
    "/category/create",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    postsController.createNewCategory
);
postsRouter.post(
    "category/delete/:id",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    postsController.deletePost
);
postsRouter.put(
    "category/update/:id",
    isAuthenticated,
    isAdmin,
    authenticateJWT,
    postsController.updatePost
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
