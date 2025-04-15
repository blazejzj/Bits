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
    console.log(username);
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

module.exports = {
    getUserById,
    usernameExists,
    createNewUser,
    getUserByUsername,
};
