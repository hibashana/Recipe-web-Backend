const{Recipes,Ingredients,Steps}=require("../models");
const asyncHandler = require("express-async-handler");
const path=require("path");
const { Op } = require('sequelize');
const httpStatus = require("http-status");



    const createRecipe = asyncHandler(async (req, res) => {
        try {
          // console.log(`name=${req.body.name}`);
          let recipes = await Recipes.findOne({
            where: {
              name: req.body.name,
            },
          });
          if (!req.file) {
            return res.status(httpStatus.BAD_REQUEST).json({ error: 'No file uploaded' });
          }
      
          if (!recipes) {
            const uploadedFileName = req.file.filename;
            console.log(`uploadedFileName=${uploadedFileName}`);
            const imagePath = path.join("public/images/", uploadedFileName);
            
            req.body.image=imagePath;
            recipes = await Recipes.create(req.body
              );
              res.status(httpStatus.OK).send(`Recipe ${recipes.name} created successfully.`);
          } else {
            return res.status(httpStatus.BAD_REQUEST).send("Recipe exist");
            
          }
          return res.status(200).json(recipes);
        } catch (error) {
          console.error(error);
          return res.status(httpStatus.BAD_REQUEST).send(error.message);
        }
      });

      const getallRecipes = asyncHandler(async (req, res) => {
        try {
          const recipe = await Recipes.findAll();
          res.status(200).json(recipe);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while fetching ' });
        }
      });


      const getaRecipe = asyncHandler(async (req, res) => {
        try {
          const recpId = req.params.id;
          const recipe = await Recipes.findByPk(recpId,{
            include: [{ model: Ingredients,attributes: ['name_qnty'], },
                      { model: Steps ,attributes: ['description'],}],
          });
          if (!recipe) {
            return res.status(404).json({ error: 'recipe not found' });
          }
          res.status(200).json(recipe);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while fetching the recipe' });
        }
      });

      const updateRecipe = asyncHandler(async (req, res) => {
        try {
          const RecipeID = req.params.id;
          const recipe= await Recipes.findByPk(RecipeID);
          if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
          }
          const uploadedFileName = req.file.filename;
          console.log(uploadedFileName);
          const imagePath = path.join("public/images/", uploadedFileName);
         await recipe.update({
            name: req.body.name,
            image: imagePath,
            description:req.body.description,
          });
          await recipe.save();
    
          res.status(200).json(recipe);
        } catch (error) {
          console.log(error);
    
          console.error(error);
         
          res.status(500).json({ error: 'An error occurred while updating the recipe' });
        }
      });

    
      const deleteRecipe = asyncHandler(async (req, res) => {
        try {
          const  recpId= req.params.id
          const recipe = await Recipes.findByPk(recpId);
          if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
          }
          await recipe.destroy();
          res.status(204).json();
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while deleting the recipe' });
        }
      });


  const searchRecipe = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const recipes = await Recipes.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Case-insensitive search for recipe names containing the given text
        },
      },
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for recipes' });
  }
});
      

 module.exports={createRecipe,getallRecipes,deleteRecipe,updateRecipe,getaRecipe,searchRecipe};