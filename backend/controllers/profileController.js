exports.getOwnProfile = async (req, res) => {
    const { name, username, email, created_at } = req.user;

    res.status(200).json({
        name,
        username,
        email,
        created_at,
    });
};
