const { validationResult, body } = require("express-validator");
const { validateUpdatedUser } = require("../validators/validateUser");
const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");

exports.getOwnProfile = async (req, res) => {
    const { id, name, username, email, created_at } = req.user;

    res.status(200).json({
        id,
        name,
        username,
        email,
        created_at,
    });
};

exports.updateUserProfile = [
    validateUpdatedUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: errors.array(),
            });
        }
        const user = await db.getUserByUsername(req.user.username);

        const authPassword = req.body.authPassword;
        const match = await bcrypt.compare(authPassword, user.password);
        if (!match) {
            return res.status(401).json({
                msg: "Password is incorrect. Try again.",
            });
        }

        const username = user.username;
        if (req.body.name) {
            await db.updateUserName(username, req.body.name);
        }

        if (req.body.email) {
            await db.updateUserEmail(username, req.body.email);
        }

        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await db.updateUserPassword(username, hashedPassword);
        }

        res.status(200).json({
            msg: "Profile successfully updated!",
        });
    },
];

exports.deleteUser = [
    body("authPassword")
        .notEmpty()
        .withMessage("Please enter your password to delete your account.")
        .bail()
        .isLength({ min: 8 })
        .withMessage("Incorrect password.")
        .isLength({ max: 100 })
        .withMessage("Incorrect password."),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({
                msg: "Incorrect password, account not deleted.",
                errors: errors.array(),
            });
        }

        await db.deleteUser(req.user.username);

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        });

        res.status(200).json({
            msg: "Account successfully deleted. Logged out.",
        });
    },
];
