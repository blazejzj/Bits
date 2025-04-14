const db = require("../prisma/queries");
const bcrypt = require("bcryptjs");
const { validateUserRegister } = require("../validators/validateUser");
const { validationResult } = require("express-validator");

exports.createNewUser = [
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
