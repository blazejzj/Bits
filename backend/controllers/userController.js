const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const { validateUserRegister } = require("../validators/validateUser");
const { validationResult } = require("express-validator");

exports.createNewUser = [
    validateUserRegister,
    (req, res) => {
        const { nickname, email, username, password, confirmPassword } =
            req.body;

        const errors = validationResult(req).array();
        if (!errors.isEmpty()) {
            res.status(400).json({
                msg: "Something went wrong with registering.",
                errors: errors,
            });
        }

        res.status(201).json({
            message: "User successfully created!",
            data: req.body,
        });
    },
];
