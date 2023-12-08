const express = require("express");
const {
  createCategory,
  getaCategory,
  getallcategory,
  deletecategry,
  updateCategory,
  searchCategory,
  getAcategoryWithRecipe,
  getAllByApp,
  getAllByFilter,
  createCategoryRecipe,
  deleteCategoryRecipe,
  getRecipesByCategoryId,
} = require("../../controller/category");
const { upload } = require("../../controller/uploadCtrl");
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");
const validate = require("../../middleware/validation");
const categoryvalidation = require("../../validation/category-validation");
const httpStatus = require("http-status");

const router = express.Router();

router.post(
  "/addcategory",
  authMiddleware,
  isAdmin,
  validate(categoryvalidation.create),
  createCategory
);

router.get("/search", searchCategory);
// router.get("/getall", getallcategory);
router.get("/getall/:id", getallcategory);
// For Mobile App
router.get("/with_Recipes/:id", getAcategoryWithRecipe);
router.get("/all_by_app/:id", getAllByApp);
router.get("/all_by_category_id", getRecipesByCategoryId);
router.get("/all_by_filter", getAllByFilter);

router.get("/:id", getaCategory);

router.delete("/:id", authMiddleware, isAdmin, deletecategry);

//For recipes By category
router.post(
  "/create_category_recipe",
  authMiddleware,
  isAdmin,
  createCategoryRecipe
);
router.delete(
  "/delete_category_recipe/:id",
  authMiddleware,
  isAdmin,
  deleteCategoryRecipe
);

router.put(
  "/updatecategory/:id",
  authMiddleware,
  isAdmin,
  validate(categoryvalidation.updateCategory),
  updateCategory
);
module.exports = router;
