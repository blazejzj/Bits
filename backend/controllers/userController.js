const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const {
    validateUserRegister,
    validateUserLogin,
} = require("../validators/validateUser");
const { validationResult } = require("express-validator");
const passport = require("passport");

exports.registerNewUser = [
    validateUserRegister,
    async (req, res) => {
        const { name, email, username, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Something went wrong with registering.",
                errors: errors.array(),
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createNewUser(name, email, username, hashedPassword);

        res.status(201).json({
            message: "User successfully created!",
            data: req.body,
        });
    },
];

exports.loginUser = [
    validateUserLogin,
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        if (!req.user) {
            throw new Error("Couldn't sign in user");
        }
    },
];
