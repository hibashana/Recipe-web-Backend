const { Recipes, Ingredients, Steps } = require("../models");
const asyncHandler = require("express-async-handler");
const path = require("path");
const pick = require("../utils/pick");
const { Op } = require("sequelize");
const httpStatus = require("http-status");
const { boolean } = require("joi");

const createRecipe = asyncHandler(async (req, res) => {
  try {
    // console.log(`name=${req.body.name}`);
    let recipes = await Recipes.findOne({
      where: {
        name: req.body.name,
      },
    });
    // if (!req.file) {
    //   return res.status(httpStatus.BAD_REQUEST).json({ error: 'No file uploaded' });
    // }

    if (!recipes) {
      const uploadedFileName = req.file.filename;
      console.log(`uploadedFileName=${uploadedFileName}`);
      const imagePath = path.join("/images/recipes/", uploadedFileName);

      req.body.image = imagePath;
      recipes = await Recipes.create(req.body);
      res.status(httpStatus.OK).send(recipes);
    } else {
      return res.status(httpStatus.BAD_REQUEST).send("Recipe exist");
    }
    //  return res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const getallRecipes = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipes.findAll();
    res.status(httpStatus.OK).json(recipe);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});
const getallRecipesByCategoryId = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipes.findAll({
      where: {
        CategoryID: req.query.CategoryID,
      },
      include: [{ model: Ingredients }, { model: Steps }],
    });
    res.status(httpStatus.OK).json(recipe);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});

const getaRecipe = asyncHandler(async (req, res) => {
  try {
    const recpId = req.params.id;
    const recipe = await Recipes.findByPk(recpId, {
      include: [
        { model: Ingredients, attributes: ["name_qnty"] },
        { model: Steps, attributes: ["description"] },
      ],
    });
    if (!recipe) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "recipe not found" });
    }
    res.status(httpStatus.OK).json(recipe);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "An error occurred while fetching the recipe" });
  }
});

const updateRecipe = asyncHandler(async (req, res) => {
  try {
    const RecipeID = req.params.id;
    const recipe = await Recipes.findByPk(RecipeID);
    if (!recipe) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Recipe not found" });
    }
    const uploadedFileName = req.file ? req.file.filename : recipe.image;
    console.log(uploadedFileName);
    const imagePath = req.file
      ? path.join("/images/recipes/", uploadedFileName)
      : recipe.image;
    await recipe.update({
      name: req.body.name,
      image: imagePath,
      description: req.body.description,
    });
    await recipe.save();

    res.status(httpStatus.OK).json(recipe);
  } catch (error) {
    console.error(error);

    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "An error occurred while updating the recipe" });
  }
});

const deleteRecipe = asyncHandler(async (req, res) => {
  try {
    const recpId = req.params.id;
    const recipe = await Recipes.findByPk(recpId);
    if (!recipe) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Recipe not found" });
    }
    await recipe.destroy();
    res.status(httpStatus.OK).json("Recipe deleted");
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "An error occurred while deleting the recipe" });
  }
});

const searchRecipe = asyncHandler(async (req, res) => {
  try {
    const { item } = req.query;
    const recipe = await Recipes.findAll({
      where: {
        name: {
          [Op.iLike]: `%${item}%`,
        },
      },
    });

    res.status(httpStatus.OK).json(recipe);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "An error occurred while searching for recipe" });
  }
});
// Change Premium Status
const premiumStatus = asyncHandler(async (req, res) => {
  const RecipeID = req.query.id;
  // Find the recipe to get the current premium status
  await Recipes.findByPk(RecipeID)
    .then(async (recipe) => {
      if (recipe) {
        // Toggle the premium status
        const updatedValues = {
          premium: !recipe.premium, // Toggle the value (true to false, or false to true)
        };

        // Perform the update
        recipe.update(updatedValues);
        await recipe.save();

        res.status(httpStatus.OK).json(recipe);
      } else {
        // Recipe not found
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Recipe not found" });
      }
    })

    .catch((error) => {
      return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    });
});

//Filter
const getAllByFilter = asyncHandler(async (req, res) => {
  const filter = pick(req.query, ["name", "premium", "CategoryID", "appID"]);
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

    // Handle 'premium' as a boolean filter
    if (filter.premium !== undefined) {
      propertyFilters.premium = {
        [Op.eq]: filter.premium,
      };
    }

    // Handle 'CategoryID' and 'appID' as exact matches (assuming they are UUIDs)
    if (filter.CategoryID) {
      propertyFilters.CategoryID = {
        [Op.eq]: filter.CategoryID,
      };
    }

    if (filter.appID) {
      propertyFilters.appID = {
        [Op.eq]: filter.appID,
      };
    }

    options.page = options.page ? parseInt(options.page) : 1;
    options.limit = options.limit ? parseInt(options.limit) : 10;

    //const recipes =
    await Recipes.findAll({
      where: propertyFilters,
      include: [{ model: Ingredients,order:[['createdAt','DESC']] }, { model: Steps }],
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
        const totalCount = await Recipes.count({ where: propertyFilters });
        const totalPages = Math.ceil(totalCount / options.limit);
        const hasNext = options.page < totalPages;
        return res.status(httpStatus.OK).json({
          status: httpStatus.OK,
          message: "success",
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
  createRecipe,
  getallRecipes,
  deleteRecipe,
  updateRecipe,
  getaRecipe,
  searchRecipe,
  getallRecipesByCategoryId,
  getAllByFilter,
  premiumStatus,
};
