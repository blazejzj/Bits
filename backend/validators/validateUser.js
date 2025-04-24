const { body } = require("express-validator");
const db = require("../prisma/queries");

const emailFormatErr = "Email is not valid";
const emailExistsErr = "Email address already in use.";
const usernamePatternErr =
    "Your username must only contain letters, digits, '-' or '_'";
const usernameLengthErr = "Your username must be between 2 and 100 characters";
const usernameAlreadyExistsErr = "Username is already in use.";
const namePatternErr = "Your name must only contain letters";
const nameLengthErr = "Your name must be between 2 and 100 letters";
const passwordShortErr = "Password must be at least 8 characters long";
const passwordLongErr = "Password cannot be longer than 100 characters";
const passwordMismatchErr = "Passwords do not match";
const loginErr = "Username or password is incorrect";
const oldPasswordRequiredErr = "Please provide your old password.";
const passwordRangeErr = "Password must be between 8 and 100 characters";

exports.validateUserRegister = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .bail()
        .matches(/^[a-zA-ZæøåÆØÅ\s-]{2,100}$/)
        .withMessage(namePatternErr)
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage(nameLengthErr),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .matches(/^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/)
        .withMessage(emailFormatErr)
        .bail()
        .custom(async (value) => {
            const user = await db.emailExists(value);
            if (user) {
                throw new Error(emailExistsErr);
            }
        }),

    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .bail()
        .isLength({ min: 2, max: 100 })
        .withMessage(usernameLengthErr)
        .bail()
        .matches(/^[a-zA-Z0-9-_]{2,100}$/)
        .withMessage(usernamePatternErr)
        .bail()
        .custom(async (value) => {
            const exists = await db.usernameExists(value);
            if (exists) {
                throw new Error(usernameAlreadyExistsErr);
            }
        }),

    body("password")
        .isLength({ min: 8 })
        .withMessage(passwordShortErr)
        .isLength({ max: 100 })
        .withMessage(passwordLongErr),

    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error(passwordMismatchErr);
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

exports.validateUpdatedUser = [
    body("name")
        .optional()
        .isLength({ min: 2, max: 100 })
        .withMessage(nameLengthErr)
        .bail()
        .matches(/^[a-zA-ZæøåÆØÅ\s-]{2,100}$/)
        .withMessage(namePatternErr),

    body("email")
        .optional()
        .matches(/^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/)
        .withMessage(emailFormatErr)
        .bail()
        .custom(async (value, { req }) => {
            const user = await db.emailExists(value);
            if (user && user.id !== req.user.id) {
                throw new Error(emailExistsErr);
            }
        }),

    body("password")
        .optional()
        .isLength({ min: 8 })
        .withMessage(passwordRangeErr)
        .isLength({ max: 100 })
        .withMessage(passwordRangeErr),

    body("confirmPassword")
        .if(body("password").exists())
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                console.log("triggered");
                throw new Error(passwordMismatchErr);
            }
            return true;
        }),

    body("authPassword")
        .notEmpty()
        .bail()
        .isLength({ min: 8 })
        .bail()
        .isLength({ max: 100 }),

    body("username").custom((value, { req }) => {
        if (req.body.username !== undefined) {
            throw new Error("Username cannot be updated.");
        }
        return true;
    }),
];
