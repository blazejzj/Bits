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

async function getAllPublishedPosts() {
    return await prisma.post.findMany({
        where: {
            published: true,
        },
        select: {
            id: true,
            title: true,
            published_at: true,
            updated_at: true,
            category: true,
        },
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
    getCommentsByPostId,
    postComment,
    getCommentById,
    updateComment,
    deleteComment,
};
