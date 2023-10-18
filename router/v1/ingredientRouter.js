const express = require('express');
const { authMiddleware, isAdmin } = require('../../middleware/authMiddleware');
const { createIngredients, getaIngredient, getallIngredients, deleteIngredient, updateIngredients } = require('../../controller/ingredientsCtrl');
const validate=require('../../middleware/validation');
const ingredientValidation=require('../../validation/ingredient-validation');

const router = express.Router();


router.post("/add", authMiddleware,isAdmin,validate(ingredientValidation.createIngredients),createIngredients);

router.get("/getall",validate(ingredientValidation.getaIngredient),getallIngredients);
router.get("/:id",getaIngredient);

router.delete('/:id',authMiddleware,isAdmin,deleteIngredient);

router.put('/:id',authMiddleware,isAdmin,validate(ingredientValidation.updateIngredients),updateIngredients);


module.exports = router;