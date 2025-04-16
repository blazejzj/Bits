const db = require("../prisma/queries");
const { validationResult } = require("express-validator");
const { validateResponse } = require("../validators/validateResponse");

exports.postResponse = [
    validateResponse,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Something went wrong while posting a response.",
                errors: errors.array(),
            });
        }

        const commentId = req.params.commentId;
        const text = req.body.text;
        const userId = req.user.id;

        await db.postResponse(commentId, text, userId);
        res.status(200).json({
            msg: "Response posted successfully.",
        });
    },
];

exports.updateResposne = [
    validateResponse,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Something went wrong while posting a response.",
                errors: errors.array(),
            });
        }

        const user = req.user;
        const responseToUpdate = await db.getResponseById(
            req.params.responseId
        );

        if (responseToUpdate.userId !== user.id) {
            return res.status(401).json({
                msg: "Not authorized to edit this comment.",
            });
        }

        await db.updateResponse(req.params.responseId, req.body.text);

        res.status(200).json({
            msg: "Response updated successfully.",
        });
    },
];
