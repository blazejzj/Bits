const { validationResult } = require("express-validator");
const db = require("../prisma/queries");
const { validateComment } = require("../validators/validateComment");

exports.getAllPostsComments = async (req, res) => {
    const postId = Number(req.params.id);
    const skip = Number(req.query.skip) || 0;
    const take = Number(req.query.take) || 10;

    const comments = await db.getCommentsByPostId(postId, skip, take);

    res.status(200).json({
        comments,
    });
};

exports.postComment = [
    validateComment,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Something went wrong while posting a comment",
                errors: errors.array(),
            });
        }

        const postId = Number(req.params.id);
        const text = req.body.text;
        const userId = req.user.id;

        await db.postComment(text, postId, userId);

        res.status(200).json({
            msg: "Comment successfully posted.",
        });
    },
];

exports.updateComment = [
    validateComment,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "Something went wrong while trying to updtae a comment.",
                errors: errors.array(),
            });
        }

        // check if comment trying to update belongs to user
        const user = req.user;
        const commentToUpdate = await db.getCommentById(req.params.commentId);

        if (commentToUpdate.userId !== user.id) {
            return res.status(401).json({
                msg: "Not authorized to edit this comment.",
            });
        }

        await db.updateComment(req.params.commentId, req.body.text);

        res.status(200).json({
            msg: "Comment succesfully updated.",
        });
    },
];

exports.deleteComment = async (req, res) => {
    const user = req.user;
    const commentToDelete = await db.getCommentById(req.params.commentId);

    if (commentToDelete.userId !== user.id && user.role !== "ADMIN") {
        return res.status(401).json({
            msg: "Not authorized to delete this comment.",
        });
    }

    await db.deleteComment(req.params.commentId);
    res.status(200).json({
        msg: "Comment succesfully deleted.",
    });
};
