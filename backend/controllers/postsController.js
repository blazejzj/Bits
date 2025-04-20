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

exports.createNewPost = async (req, res) => {
    const { title, text, categoryName, published } = req.body;
    const categoryId = await db.getCategoryIdByName(categoryName);

    await db.createNewPost(title, text, categoryId, published);
    res.status(200).json({
        msg: "Successfully created a new post!",
    });
};

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, text, categoryName } = req.body;
    const categoryId = await db.getCategoryIdByName(categoryName);

    await db.updatePost(postId, title, text, categoryId);

    res.status(200).json({
        msg: "Successfully updated the post!",
    });
};

exports.deletePost;

exports.publishPost;

exports.unpublishPost;
