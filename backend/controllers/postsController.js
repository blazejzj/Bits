const db = require("../prisma/queries");

exports.getAllPosts = async (req, res) => {
    const posts = await db.getAllPublishedPosts();
    res.status(200).json({ posts });
};

exports.getSinglePostById = async (req, res) => {
    const post = await db.getSinglePostById(Number(req.params.id));

    if (!post.published) {
        return res.status(404).json({
            msg: "Post with provided id doesn't exist or is unpublished.",
        });
    }

    return res.status(200).json({ post });
};
