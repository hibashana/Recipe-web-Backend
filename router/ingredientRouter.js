const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createIngredients, getaIngredient, getallIngredients, deleteIngredient, updateIngredients } = require('../controller/ingredientsCtrl');


const router = express.Router();


router.post("/add", authMiddleware,isAdmin,createIngredients);

router.get("/getall",getallIngredients);
router.get("/:id",getaIngredient);

router.delete('/:id',authMiddleware,isAdmin,deleteIngredient);

router.put('/:id',authMiddleware,isAdmin,updateIngredients);


module.exports = router;