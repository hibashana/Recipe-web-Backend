const{Category}=require("../models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const { generateToken } = require("../config/jwtToken");
const asyncHandler = require("express-async-handler");
const category = require("../models/category");

const JWT_SECRET = process.env.JWT_SECRET;

const createCategory = asyncHandler(async (req, res, next) => {
    try {
      const { name, image, no_of_recipes } = req.body;
      const category = await Category.create({ name, image, no_of_recipes });
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the category' });
    }
  });

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