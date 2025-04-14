const { body } = require("express-validator");
const db = require("../prisma/queries");

const emailFormatErr = "Email is not valid";
const alphaErr = "Your name must only contain letters";
const nameLengthErr = "Your name must be between 2 and 100 letters";
const usernamePatternErr =
    "Your username must only contain letters, digits, '-' or '_'";
const usernameLengthErr = "Your username must be between 2 and 100 characters";
const tooShortPasswordErr = "Password must be at least 8 characters long";
const tooLongPasswordErr = "Password cannot be longer than 100 characters";
const passwordsDontMatchErr = "Passwords do not match";
const usernameAlreadyExists = "Username is already in use.";

exports.validateUserRegister = [
    body("name")
        .matches(/^[a-zA-ZæøåÆØÅ\s-]{2,100}$/)
        .withMessage(alphaErr)
        .isLength({ min: 2, max: 100 })
        .withMessage(nameLengthErr),

    body("email")
        .matches(/^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/)
        .withMessage(emailFormatErr),

    body("username")
        .matches(/^[a-zA-Z0-9-_]{2,100}$/)
        .withMessage(usernamePatternErr)
        .isLength({ min: 2, max: 100 })
        .withMessage(usernameLengthErr)
        .custom(async (value) => {
            console.log("username: " + value);
            const exists = await db.usernameExists(value);
            if (exists) {
                throw new Error(usernameAlreadyExists);
            }
        }),
    body("password")
        .isLength({ min: 8 })
        .withMessage(tooShortPasswordErr)
        .isLength({ max: 100 })
        .withMessage(tooLongPasswordErr),

    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error(passwordsDontMatchErr);
        }
        return true;
    }),
];
