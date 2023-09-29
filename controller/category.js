const{Category}=require("../models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const { generateToken } = require("../config/jwtToken");
const asyncHandler = require("express-async-handler");


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
//     const { name, image, no_of_recipes } = req.body;

    

//     const category = await Category.create({ name, image, no_of_recipes });
//     res.status(201).json(category);
    
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while creating the category' });
//   }
 
// });

const createCategory = async (req, res) => {
  try {
    console.log(`name=${req.body.no_of_recipes}`);
    let category = await Category.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (!category) {
      const uploadedFileName = req.file.filename;
      console.log(uploadedFileName);
      const imagePath = path.join("public/images/", uploadedFileName);
      category = await Category.create({
        name: req.body.name,
        image: imagePath,
        no_of_recipes:req.body.no_of_recipes,
      });
    } else {
      return res.status(200).json({ message: "Category exist" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


  const getaCategory = asyncHandler(async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the category' });
    }
  });

  const getallcategory = asyncHandler(async (req, res) => {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching ' });
    }
  });

  const deletecategry = asyncHandler(async (req, res) => {
    try {
      const  categoryId= req.params.id
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'category not found' });
      }
      await category.destroy();
      res.status(204).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the category' });
    }
  });


  
  


  module.exports = {createCategory,getaCategory,getallcategory,deletecategry};