const prisma = require("./prisma");

async function getUserById(id) {
    await prisma.user.findUnique({
        where: {
            id,
        },
    });

    return user;
}

async function userNameExists(username) {
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (user) {
        return true;
    }

    return false;
}

module.exports = {
    getUserById,
};
