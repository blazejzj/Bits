require("dotenv").config();
const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const {
    validateUserRegister,
    validateUserLogin,
} = require("../validators/validateUser");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.registerNewUser = [
    validateUserRegister,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Something went wrong with registering.",
                errors: errors.array(),
            });
        }

        const { name, email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.createNewUser(name, email, username, hashedPassword);

        res.status(201).json({
            message: "User successfully created!",
        });
    },
];

exports.loginAdmin = [
    validateUserLogin,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Something went wrong with logging in",
                errors: errors.array(),
            });
        }

        const { username, password } = req.body;
        const user = await db.getUserByUsername(username);

        if (!user) {
            return res
                .status(401)
                .json({ msg: "Username or password is incorrect" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res
                .status(401)
                .json({ msg: "Username or password is incorrect" });
        }

        if (user.role !== "ADMIN") {
            return res
                .status(401)
                .json({ msg: "Unauthorized. Can't access this resource." });
        }

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
            sameSite: "strict",
        });

        res.status(200).json({
            msg: "Login successfull",
        });
    },
];
exports.loginUser = [
    validateUserLogin,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Something went wrong with logging in",
                errors: errors.array(),
            });
        }

        const { username, password } = req.body;
        const user = await db.getUserByUsername(username);

        if (!user) {
            return res
                .status(401)
                .json({ msg: "Username or password is incorrect" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res
                .status(401)
                .json({ msg: "Username or password is incorrect" });
        }

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
            sameSite: "strict",
        });

        res.status(200).json({
            msg: "Login successfull",
        });
    },
];

exports.logOut = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    });

    res.status(200).json({
        message: "Logged out successfully.",
    });
};
