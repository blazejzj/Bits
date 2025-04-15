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

const loginErr = "Username or password is incorrect";

exports.validateUserRegister = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .bail()
        .matches(/^[a-zA-ZæøåÆØÅ\s-]{2,100}$/)
        .withMessage(alphaErr)
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage(nameLengthErr),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .matches(/^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/)
        .withMessage(emailFormatErr),

    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .bail()
        .matches(/^[a-zA-Z0-9-_]{2,100}$/)
        .withMessage(usernamePatternErr)
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage(usernameLengthErr)
        .bail()
        .custom(async (value) => {
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
        if (!req.password) {
            throw new Error("Must provide a valid password");
        }
        if (value !== req.body.password) {
            throw new Error(passwordsDontMatchErr);
        }
        return true;
    }),
];

exports.validateUserLogin = [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .bail()
        .matches(/^[a-zA-Z0-9-_]{2,100}$/)
        .withMessage(loginErr)
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage(loginErr),
    body("password")
        .isLength({ min: 8 })
        .withMessage(loginErr)
        .isLength({ max: 100 })
        .withMessage(loginErr),
];
