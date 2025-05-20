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
postsRouter.get(
    "/admin",
    authenticateJWT,
    isAdmin,
    postsController.getAllPostsAdmin
);
postsRouter.get(
    "/category/:slugname",
    postsController.getPostsByCategorySlugname
);
postsRouter.get("/category", categoryController.getCategories);

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
    "/category/:name/updatename",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    categoryController.updateCategoryName
);
postsRouter.patch(
    "/category/:slugname/updateslugname",
    authenticateJWT,
    isAuthenticated,
    isAdmin,
    categoryController.updateCategorySlugname
);
postsRouter.delete(
    "/category/:slugname/delete",
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

postsRouter.delete(
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

postsRouter.get("/:id", postsController.getSinglePostById);
module.exports = postsRouter;
