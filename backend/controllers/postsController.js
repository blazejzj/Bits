const db = require("../prisma/queries");

exports.getAllPostsAdmin = async (req, res) => {
    const user = req.user;
    if (user.role !== "ADMIN")
        return res.status(401).json({ msg: "Unauthorized." });

    const posts = await db.getAllPostsAdmin();
    return res.status(200).json(posts);
};

exports.getAllPosts = async (req, res) => {
    const posts = await db.getAllPublishedPosts();
    return res.status(200).json(posts);
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
    const { title, text, categoryId, published } = req.body;

    await db.createNewPost(title, text, Number(categoryId), published);
    res.status(200).json({
        msg: "Successfully created a new post!",
    });
};

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, text, categoryName } = req.body;
    const categoryId = await db.getCategoryIdByName(categoryName);

    await db.updatePost(Number(postId), title, text, Number(categoryId.id));

    res.status(200).json({
        msg: "Successfully updated the post!",
    });
};

exports.deletePost = async (req, res) => {
    const postId = req.params.id;

    await db.deletePost(Number(postId));

    res.status(200).json({
        msg: "Post successfully deleted.",
    });
};

exports.publishPost = async (req, res) => {
    const postId = req.params.id;

    await db.publishPost(Number(postId));

    res.status(200).json({
        msg: "Post successfully published.",
    });
};

exports.unpublishPost = async (req, res) => {
    const postId = req.params.id;

    await db.unpublishPost(Number(postId));

    res.status(200).json({
        msg: "Post successfully unpublished.",
    });
};

exports.getPostsByCategorySlugname = async (req, res) => {
    const { slugname } = req.params;
    const exists = await db.categoryExists(slugname);
    if (!exists) {
        return res.status(404).json({
            msg: "Category name doesn't exist.",
        });
    }

    const posts = await db.getPostsByCategorySlugname(slugname);
    return res.status(200).json(posts);
};
