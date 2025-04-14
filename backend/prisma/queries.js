const prisma = require("./prisma");

async function getUserById(id) {
    prisma.user.findUnique({
        where: {
            id,
        },
    });

    return user;
}

module.exports = {
    getUserById,
};
