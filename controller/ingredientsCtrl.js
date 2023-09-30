const{Ingredients}=require("../models");
const asyncHandler = require("express-async-handler");


const createIngredients = asyncHandler(async (req, res) => {
  try {
    const { name_qnty, RecipeID } = req.body;
    const ingredients = await Ingredients.create({ name_qnty, RecipeID });
    res.status(201).json(ingredients);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


  const getaIngredient = asyncHandler(async (req, res) => {
    try {
      const ingrntId = req.params.id;
      const ingredients = await Ingredients.findByPk(ingrntId);
      if (!ingredients) {
        return res.status(404).json({ error: 'Ingredient not found' });
      }
      res.status(200).json(ingredients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the Ingredient' });
    }
  });

  const getallIngredients = asyncHandler(async (req, res) => {
    try {
      const ingredients = await Ingredients.findAll();
      res.status(200).json(ingredients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching ' });
    }
  });
  

  const deleteIngredient = asyncHandler(async (req, res) => {
    try {
      const  ingrntId= req.params.id
      const ingredients = await Ingredients.findByPk(ingrntId);
      if (!ingredients) {
        return res.status(404).json({ error: 'ingredients not found' });
      }
      await ingredients.destroy();
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the ingredients' });
    }
  });


  const updateIngredients = asyncHandler(async (req, res) => {
    try {
      const ingrntId = req.params.id;
      const ingredients = await Ingredients.findByPk(ingrntId);
      if (!ingredients) {
        return res.status(404).json({ error: 'Ingredient not found' });
      }
      
      await ingredients.update(req.body);
  
      res.status(200).json(ingredients);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the ingredient' });
    }
  });
 
  module.exports={createIngredients,getaIngredient,getallIngredients,deleteIngredient,updateIngredients};