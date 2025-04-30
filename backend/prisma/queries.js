const prisma = require("./prisma");

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    return user;
}

async function getUserByUsername(username) {
    return await prisma.user.findUnique({
        where: {
            username,
        },
    });
}

async function usernameExists(username) {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    return !!user;
}

async function createNewUser(name, email, username, password) {
    await prisma.user.create({
        data: {
            name: name,
            email: email,
            username: username,
            password: password,
        },
    });
}

async function emailExists(email) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return !!user;
}

async function updateUserName(username, name) {
    await prisma.user.update({
        where: {
            username,
        },
        data: {
            name,
        },
    });
}

async function updateUserEmail(username, email) {
    await prisma.user.update({
        where: {
            username,
        },
        data: {
            email,
        },
    });
}

async function updateUserPassword(username, password) {
    await prisma.user.update({
        where: {
            username,
        },
        data: {
            password,
        },
    });
}

async function deleteUser(username) {
    await prisma.user.delete({
        where: {
            username,
        },
    });
}

async function getAllPublishedPosts(categoryName) {
    const where = {
        published: true,
        ...(categoryName ? { category: { slugname: categoryName } } : {}),
    };

    return await prisma.post.findMany({
        where,
        select: {
            id: true,
            title: true,
            published_at: true,
            updated_at: true,
            category: true,
        },
        orderBy: { published_at: "desc" },
    });
}

async function getSinglePostById(id) {
    return await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            comments: {
                include: {
                    responses: {
                        orderBy: {
                            published_at: "desc",
                        },
                    },
                },
                orderBy: {
                    published_at: "desc",
                },
            },
        },
    });
}

async function getCommentsByPostId(postId, skip, take) {
    return await prisma.comment.findMany({
        where: {
            postId,
        },
        orderBy: {
            published_at: "desc",
        },
        include: {
            responses: true,
        },
        skip,
        take,
    });
}

async function postComment(text, postId, userId) {
    return await prisma.comment.create({
        data: {
            text: text,
            postId: postId,
            userId: userId,
            published_at: new Date(),
            updated_at: new Date(),
        },
    });
}

async function getCommentById(id) {
    return await prisma.comment.findUnique({
        where: {
            id,
        },
    });
}

async function updateComment(id, text) {
    await prisma.comment.update({
        where: {
            id: id,
        },
        data: {
            text: text,
        },
    });
}

async function deleteComment(id) {
    await prisma.comment.delete({
        where: {
            id,
        },
    });
}

async function postResponse(commentId, text, userId) {
    await prisma.response.create({
        data: {
            commentId,
            text,
            userId,
        },
    });
}

async function deleteResponse(responseId) {
    await prisma.response.delete({
        where: {
            id: responseId,
        },
    });
}

async function updateResponse(responseId, text) {
    await prisma.response.update({
        where: {
            id: responseId,
        },
        data: {
            text,
        },
    });
}

async function getResponseById(id) {
    return await prisma.response.findUnique({
        where: {
            id,
        },
    });
}

async function getAllCategories() {
    return await prisma.category.findMany({
        select: {
            name: true,
            slugname: true,
        },
    });
}

async function categoryExists(slugname) {
    const category = await prisma.category.findUnique({
        where: { slugname },
    });
    return !!category;
}

async function createNewCategory(name, slugname) {
    await prisma.category.create({
        data: {
            name,
            slugname,
        },
    });
}

async function deleteCategoryBySlugname(slugname) {
    await prisma.category.delete({
        where: {
            slugname,
        },
    });
}

async function updateCategoryName(name, newName) {
    await prisma.category.update({
        where: {
            name,
        },
        data: {
            name: newName,
        },
    });
}

async function updateCategorySlugname(slugname, newSlugname) {
    await prisma.category.update({
        where: {
            slugname,
        },
        data: {
            slugname: newSlugname,
        },
    });
}

async function getCategoryIdBySlugname(slugname) {
    return await prisma.category.findUnique({
        where: {
            slugname,
        },
        include: {
            id,
        },
    });
}

async function createNewPost(title, text, categoryId, published) {
    await prisma.post.create({
        data: {
            title: title,
            text: text,
            categoryId: categoryId,
            published_at: new Date(),
            updated_at: new Date(),
            published: published,
        },
    });
}

async function updatePost(id, title, text, categoryId) {
    await prisma.post.update({
        where: {
            id,
        },
        data: {
            title: title,
            text: text,
            categoryId: categoryId,
            updated_at: new Date(),
        },
    });
}

async function deletePost(id) {
    await prisma.post.delete({
        where: {
            id,
        },
    });
}

async function publishPost(id) {
    await prisma.post.update({
        where: {
            id,
        },
        data: {
            published_at: new Date(),
            published: true,
        },
    });
}

async function unpublishPost(id) {
    await prisma.post.update({
        where: {
            id,
        },
        data: {
            published: false,
        },
    });
}

module.exports = {
    getUserById,
    usernameExists,
    createNewUser,
    getUserByUsername,
    emailExists,
    updateUserEmail,
    updateUserName,
    updateUserPassword,
    deleteUser,

    getAllPublishedPosts,
    getSinglePostById,
    createNewPost,
    updatePost,
    deletePost,
    publishPost,
    unpublishPost,

    getCommentsByPostId,
    postComment,
    getCommentById,
    updateComment,
    deleteComment,

    postResponse,
    deleteResponse,
    updateResponse,
    getResponseById,

    getAllCategories,
    createNewCategory,
    categoryExists,
    deleteCategoryBySlugname,
    updateCategoryName,
    getCategoryIdBySlugname,
    updateCategorySlugname,
};
