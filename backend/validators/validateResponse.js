const { body } = require("express-validator");

const lengthErr = "Response has to be between 1 and 250 characters.";
const alphaErr = "Response must not include and extraordinary characters.";

exports.validateResponse = [
    body("text")
        .isLength({ min: 1, max: 250 })
        .withMessage(lengthErr)
        .bail()
        .matches(/^[\d\w\s,-.!?"'()%@&/æøå;:*=#£$€¥]{2,250}$/)
        .withMessage(alphaErr),
];
