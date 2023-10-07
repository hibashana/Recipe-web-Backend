const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createRecipe, deleteRecipe, getallRecipes, updateRecipe, getaRecipe, searchRecipe } = require('../controller/recipeCtrl');
const { upload } = require('../controller/uploadCtrl');
const validate=require('../middleware/validation');
const recipevalidation=require('../validation/recipe-validation');


const router = express.Router();

router.post("/addrecipe",authMiddleware,upload.single('image'),(req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
      CategoryID:req.body.CategoryID
    };

    const { error } = recipevalidation.createRecipe.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },createRecipe);

router.get("/searchrecipe",searchRecipe);

router.get("/getall",getallRecipes);
router.get("/:id",validate(recipevalidation.getaRecipe),getaRecipe);


router.put('/updaterecipe/:id',authMiddleware,isAdmin,upload.single('image'),(req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
    //   CategoryID:req.body.CategoryID
    };

    const { error } = recipevalidation.updateRecipe.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },updateRecipe);



router.delete('/:id',authMiddleware,isAdmin,deleteRecipe);



module.exports = router;