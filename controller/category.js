const { Category, Recipes } = require("../models");
const { Op } = require("sequelize");
const path = require("path");
const asyncHandler = require("express-async-handler");
const httpStatus = require("http-status");
const validate = require("../middleware/validation");
const categoryvalidation = require("../validation/category-validation");

// const categoryExists = asyncHandler(async (req, res) => {
//   const { name } = req.body;
// console.log(`name=${name}`);
//   const existingCategory = await Category.findOne({ where: { name:name } });
//   if (existingCategory) {
//     return res.status(400).json({ error: 'Category with this name already exists' });
//   }

// });

// const createCategory = asyncHandler(async (req, res) => {
//   try {
//     const { name, image, no_of_Category } = req.body;

//     const category = await Category.create({ name, image, no_of_Category });
//     res.status(201).json(category);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while creating the category' });
//   }

// });

const createCategory = async (req, res) => {
  try {
    // console.log(`name=${req.body.no_of_Category}`);

    let category = await Category.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!category) {
      // const uploadedFileName = req.file.filename;
      // console.log(uploadedFileName);
      // const imagePath = path.join("public/images/", uploadedFileName);
      category = await Category.create({
        name: req.body.name,
        appID: req.body.appID,
        // image: imagePath,
        // no_of_Category:req.body.no_of_Category,
      });
    } else {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Category exist" });
    }
    // return res.status(httpStatus.OK).send(`Categories ${category.name} created successfully.`);
    return res.status(httpStatus.OK).json(category);
  } catch (error) {
    // console.error("Error creating category:", error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

const getaCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const getallcategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findAll();
    res.status(httpStatus.OK).json(category);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const cid = req.params.id;
    const category = await Category.findByPk(cid);
    if (!category) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Category not found" });
    }

    const uploadedFileName = req.file.filename;
    console.log(uploadedFileName);
    const imagePath = path.join("public/images/", uploadedFileName);
    await category.update({
      name: req.body.name,
      image: imagePath,
      app: req.body.appID,
      // no_of_Category:req.body.no_of_Category,
    });
    await category.save();

    res.status(httpStatus.OK).json(category);
  } catch (error) {
    console.log(error);

    console.error(error);

    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const deletecategry = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Category not found" });
    }
    await category.destroy();
    res.status(httpStatus.OK).json("Deleted Successfully");
  } catch (error) {
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json(error.message);
  }
});

const searchCategory = asyncHandler(async (req, res) => {
  try {
    const { item } = req.query;
    const category = await Category.findAll({
      where: {
        name: {
          [Op.iLike]: `%${item}%`,
        },
      },
    });

    res.status(httpStatus.OK).json(category);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "An error occurred while searching for Category" });
  }
});

// For Mobile App

const   getAcategoryWithRecipe = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: [{ model: Recipes }],
    });
    res.status(httpStatus.OK).json(category.Recipes);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});
// For Mobile App
const getAllByApp = asyncHandler(async (req, res) => {
  try {
    const appId = req.params.id;
    const category = await Category.findAll({
      where: {
        appID: appId,
      },
      include:[{ model: Recipes }]
    });
    res.status(httpStatus.OK).json(category);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});
module.exports = {
  createCategory,
  getaCategory,
  getallcategory,
  deletecategry,
  updateCategory,
  searchCategory,
  getAcategoryWithRecipe,
  getAllByApp,
};
