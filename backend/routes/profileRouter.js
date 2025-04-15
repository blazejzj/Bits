const { Router } = require("express");
const profileRouter = Router();
const profileController = require("../controllers/profileController");
const {
    authenticateJWT,
    isAuthenticated,
} = require("../middleware/authMiddleware");

profileRouter.get(
    "/",
    authenticateJWT,
    isAuthenticated,
    profileController.getOwnProfile
);
profileRouter.patch(
    "/",
    authenticateJWT,
    isAuthenticated,
    profileController.updateUserProfile
);
profileRouter.delete(
    "/",
    authenticateJWT,
    isAuthenticated,
    profileController.deleteUser
);

module.exports = profileRouter;
