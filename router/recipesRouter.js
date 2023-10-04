const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createRecipe, deleteRecipe, getallRecipes, updateRecipe, getaRecipe, searchRecipe } = require('../controller/recipeCtrl');
const { upload } = require('../controller/uploadCtrl');


const router = express.Router();

router.post("/addrecipe",authMiddleware,isAdmin,upload.single('image'),createRecipe);

router.get("/searchrecipe",searchRecipe);

router.get("/getall",getallRecipes);
router.get("/:id",getaRecipe);


router.put('/updaterecipe/:id',authMiddleware,isAdmin,upload.single('image'),updateRecipe);



router.delete('/:id',authMiddleware,isAdmin,deleteRecipe);



module.exports = router;