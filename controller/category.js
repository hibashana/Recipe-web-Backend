const { Category, Recipes, Steps, Ingredients } = require("../models");
const { Op } = require("sequelize");
const path = require("path");
const asyncHandler = require("express-async-handler");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
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
    // const category = await Category.findAll();
    const appId = req.params.id;
    const category = await Category.findAll({
      where: {
        appID: appId,
      }});
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

    // const uploadedFileName = req.file.filename;
    // console.log(uploadedFileName);
    // const imagePath = path.join("public/images/", uploadedFileName);
    // await category.update({
    //   name: req.body.name,
    //   image: imagePath,
    //   app: req.body.appID,
    //   // no_of_Category:req.body.no_of_Category,
    // });
    await category.update(req.body);
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

const getAcategoryWithRecipe = asyncHandler(async (req, res) => {
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
      include: [
        {
          model: Recipes,
          limit: 10,
          include: [{ model: Ingredients }, { model: Steps }],
        },
      ],
    });

    res.status(httpStatus.OK).json(category);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const getAllByFilter = asyncHandler(async (req, res) => {
  const filter = pick(req.query, ["name", "appID"]);
  const options = pick(req.query, ["sortBy", "limit", "page", "count"]);

  try { 
    const propertyFilters = {};

    // Iterate over the property names and add filters if they exist in 'filter'
    const propertyNamesToFilter = ["name"];
    propertyNamesToFilter.forEach((propertyName) => {
      if (filter[propertyName]) {
        propertyFilters[propertyName] = {
          [Op.iLike]: `%${filter[propertyName]}%`,
        };
      }
    });

    if (filter.appID) {
      propertyFilters.appID = {
        [Op.eq]: filter.appID,
      };
    }

    options.page = options.page ? parseInt(options.page) : 1;
    options.limit = options.limit ? parseInt(options.limit) : 10;

    //const recipes =
    await Category.findAll({
      where: propertyFilters,
      include: [
        {
          model: Recipes,
          limit: 10,
          order:[["premium"]],
          include: [{ model: Ingredients }, { model: Steps }],
        },
      ],
      order: options.sortBy
        ? options.sortBy == "createdAt"
          ? [[options.sortBy, "DESC"]]
          : [[options.sortBy, "ASC"]]
        : undefined,
      limit: parseInt(options.limit),
      offset: options.page
        ? (parseInt(options.page) - 1) * parseInt(options.limit)
        : undefined,
    })
      .then(async (recipes) => {
        const totalCount = await Category.count({ where: propertyFilters });
        const totalPages = Math.ceil(totalCount / options.limit);
        const hasNext = options.page < totalPages;
        return res.status(httpStatus.OK).json({
          status: httpStatus.OK,
          message: httpStatus["200_NAME"],
          data: recipes,
          page: options.page,
          limit: options.limit,
          totalPages: totalPages,
          totalCount: totalCount,
          hasNext: hasNext,
        });
      })
      .catch((error) => {
        return res
          .status(httpStatus.BAD_REQUEST)
          .send({ error: error.message });
      });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: error.message });
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
  getAllByFilter,
};
