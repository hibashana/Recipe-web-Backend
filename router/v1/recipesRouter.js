const express = require("express");
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");
const {
  createRecipe,
  deleteRecipe,
  getallRecipes,
  updateRecipe,
  getaRecipe,
  searchRecipe,
  getallRecipesByCategoryId,
  getAllByFilter,
  premiumStatus,
} = require("../../controller/recipeCtrl");
const { uploadRecipes } = require("../../controller/uploadCtrl");
const validate = require("../../middleware/validation");
const recipevalidation = require("../../validation/recipe-validation");

const router = express.Router();

router.post(
  "/addrecipe",
  authMiddleware,
  uploadRecipes.single("image"),
  (req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
      CategoryID: req.body.CategoryID,
      appID: req.body.appID,
    };

    const { error } = recipevalidation.createRecipe.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },
  createRecipe
);

router.get("/searchrecipe", searchRecipe);

router.get("/getall", getallRecipes);

//For Mobile App
router.get("/all_by_category_id", getallRecipesByCategoryId);
router.get("/all_by_filter", getAllByFilter);

router.get("/change_premium_status", authMiddleware, isAdmin, premiumStatus);
router.get("/:id", validate(recipevalidation.getaRecipe), getaRecipe);

router.put(
  "/updaterecipe/:id",
  authMiddleware,
  isAdmin,
  uploadRecipes.single("image"),
  (req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      //image: req.file ? req.file.filename : "", // Convert the buffer to base64
      //   CategoryID:req.body.CategoryID
    };

    const { error } = recipevalidation.updateRecipe.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },
  updateRecipe
);

router.delete("/:id", authMiddleware, isAdmin, deleteRecipe);

module.exports = router;
