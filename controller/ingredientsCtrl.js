const{Ingredients}=require("../models");
const asyncHandler = require("express-async-handler");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const { Op } = require("sequelize");

const createIngredients = asyncHandler(async (req, res) => {
  try {
    const { name_qnty, RecipeID } = req.body;
    const ingredients = await Ingredients.create({ name_qnty, RecipeID });
    return res.status(httpStatus.OK).json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
});


  const getaIngredient = asyncHandler(async (req, res) => {
    try {
      const ingrntId = req.params.id;
      const ingredients = await Ingredients.findByPk(ingrntId);
      if (!ingredients) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Ingredient not found' });
      }
      res.status(httpStatus.OK).json(ingredients);
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  });

  const getallIngredients = asyncHandler(async (req, res) => {
    try {
      const ingredients = await Ingredients.findAll();
      res.status(httpStatus.OK).json(ingredients);
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
      // res.status(500).json({ error: 'An error occurred while fetching ' });
    }
  });
  

  const deleteIngredient = asyncHandler(async (req, res) => {
    try {
      const  ingrntId= req.params.id
      const ingredients = await Ingredients.findByPk(ingrntId);
      if (!ingredients) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'ingredients not found' });
      }
      await ingredients.destroy();
      return res.status(httpStatus.OK).json('Deleted successfully');
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
      // res.status(500).json({ error: 'An error occurred while deleting the ingredients' });
    }
  });


  const updateIngredients = asyncHandler(async (req, res) => {
    try {
      const ingrntId = req.params.id;
      const ingredients = await Ingredients.findByPk(ingrntId);
      if (!ingredients) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Ingredient not found' });
      }
      
      await ingredients.update(req.body);
  
      res.status(httpStatus.OK).json(ingredients);
    } catch (error) {
      console.error(error);
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
      // res.status(500).json({ error: 'An error occurred while updating the ingredient' });
    }
  });
  
  const getAllByFilter = asyncHandler(async (req, res) => {
    const filter = pick(req.query, ["name",  "RecipeID",]);
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
      // if (filter.premium !== undefined) {
      //   propertyFilters.premium = {
      //     [Op.eq]: filter.premium,
      //   };
      // }
  
      // Handle 'CategoryID' and 'appID' as exact matches (assuming they are UUIDs)
      if (filter.RecipeID) {
        propertyFilters.RecipeID = {
          [Op.eq]: filter.RecipeID,
        };
      }
  
      // if (filter.appID) {
      //   propertyFilters.appID = {
      //     [Op.eq]: filter.appID,
      //   };
      // }
  
      options.page = options.page ? parseInt(options.page) : 1;
      options.limit = options.limit ? parseInt(options.limit) : 3;
  
      //const recipes =
      await Ingredients.findAll({
        where: propertyFilters,
        //include: [{ model: Ingredients,order:[['createdAt','DESC']] }, { model: Steps }],
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
          const totalCount = await Ingredients.count({ where: propertyFilters });
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
  module.exports={createIngredients,getaIngredient,getallIngredients,deleteIngredient,updateIngredients,getAllByFilter};