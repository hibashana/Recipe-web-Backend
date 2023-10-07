const{Ingredients}=require("../models");
const asyncHandler = require("express-async-handler");
const httpStatus = require("http-status");


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
 
  module.exports={createIngredients,getaIngredient,getallIngredients,deleteIngredient,updateIngredients};