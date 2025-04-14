exports.createNewUser = (req, res) => {
    console.log("data gotten", req.body);

    res.status(201).json({
        message: "User successfully created!",
        data: req.body,
    });
};
