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
};
