const { body } = require("express-validator");

const lengthErr = "Comment has to be between 1 and 250 characters.";
const alphaErr = "Comments must not include any extraordinary characters.";

exports.validateComment = [
    body("text")
        .isLength({ min: 1, max: 250 })
        .withMessage(lengthErr)
        .bail()
        .matches(/^[\d\w\s,-.!?"'()%@&/æøå;:*=#£$€¥]{2,250}$/)
        .withMessage(alphaErr),
];
