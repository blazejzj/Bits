const db = require("../prisma/queries");

exports.getCategories = async (req, res) => {
    const categories = await db.getAllCategories();
    return res.status(200).json(categories);
};

exports.createNewCategory = async (req, res) => {
    const { name, slugname } = req.body;

    const categoryExists = await db.categoryExists(slugname);
    if (!categoryExists) {
        await db.createNewCategory(name, slugname);

        return res.status(200).json({
            msg: "Successfully created a new category " + name,
        });
    }

    return res.status(400).json({
        msg: "Category already exists with this name.",
    });
};

exports.deleteCategory = async (req, res) => {
    const slugname = req.params.slugname.toLowerCase();

    const categoryExists = await db.categoryExists(slugname);
    if (!categoryExists) {
        await db.deleteCategoryBySlugname(slugname);

        return res.status(200).json({
            msg: "Successfully deleted category " + slugname,
        });
    }

    return res.status(400).json({
        msg: "Category with given name doesn't exist.",
    });
};

exports.updateCategoryName = async (req, res) => {
    const { name, newName } = req.body;

    const categoryExists = await db.categoryExists(name);
    if (!categoryExists) {
        return res.status(400).json({ msg: "Category doesn't exist." });
    }
    if (name === newName) {
        return res
            .status(400)
            .json({ msg: "New name is the same as current." });
    }

    await db.updateCategoryName(name, newName);
    return res.status(200).json({ msg: "Successfully changed category name." });
};

exports.updateCategorySlugname = async (req, res) => {
    const { slugname, newSlugname } = req.body;

    const categoryExists = await db.categoryExistsBySlugname(slugname);
    if (!categoryExists) {
        return res.status(400).json({ msg: "Category doesn't exist." });
    }
    if (slugname === newSlugname) {
        return res
            .status(400)
            .json({ msg: "New name is the same as current." });
    }

    await db.updateCategorySlugname(slugname, newSlugname);
    return res
        .status(200)
        .json({ msg: "Successfully changed category slugname." });
};
