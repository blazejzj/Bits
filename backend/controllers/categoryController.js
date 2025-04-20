const db = require("../prisma/queries");

exports.getCategories = async (req, res) => {
    const categories = await db.getAllCategories();
    return res.status(200).json(categories);
};

exports.createNewCategory = async (req, res) => {
    const name = req.params.name.toLowerCase();

    const categoryExists = await db.categoryExists(name);
    if (!categoryExists) {
        await db.createNewCategory(name);

        return res.status(200).json({
            msg: "Successfully created a new category " + name,
        });
    }

    return res.status(400).json({
        msg: "Category already exists with this name.",
    });
};

exports.deleteCategory = async (req, res) => {
    const name = req.params.name.toLowerCase();

    const categoryExists = await db.categoryExists(name);
    if (!categoryExists) {
        await db.deleteCategoryByName(name);

        return res.status(200).json({
            msg: "Successfully deleted category " + name,
        });
    }

    return res.status(400).json({
        msg: "Category with given name doesn't exist.",
    });
};

exports.updateCategory = async (req, res) => {
    const name = req.params.name.toLowerCase();
    const newName = req.body.newName.toLowerCase();

    const categoryExists = await db.categoryExists(name);
    if (!categoryExists || name !== newName) {
        await db.updateCategoryName(name, newName);

        return res.status(200).json({
            msg: "Successfully changed category name.",
        });
    }

    return res.status(400).json({
        msg: "Category doesn't exists or you're trying to update a category name with the same name.",
    });
};
