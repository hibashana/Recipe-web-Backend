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
} = require("../../controller/category");
const { upload } = require("../../controller/uploadCtrl");
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");
const validate = require("../../middleware/validation");
const categoryvalidation = require("../../validation/category-validation");
const httpStatus = require("http-status");

const router = express.Router();

// router.post(
//   "/addcategory",
//   authMiddleware,
//   isAdmin,
//   upload.single("image"),
//   (req, res, next) => {
//     // Validate the form data
//     const formData = {
//       name: req.body.name,
//       image: req.file ? req.file.filename : "", // Convert the buffer to base64
//     };

//     const { error } = categoryvalidation.create.validate(formData);

//     if (error) {
//       // Handle validation errors
//       return res
//         .status(httpStatus.BAD_REQUEST)
//         .json({ error: error.details[0].message });
//     }
//     next();
//   },
//   createCategory
// );
router.post(
  "/addcategory",
  authMiddleware,
  isAdmin,
 validate(categoryvalidation.create),
  createCategory
);

router.get("/search", searchCategory);

router.get("/getall", getallcategory);
// For Mobile App
router.get("/with_Recipes/:id",getAcategoryWithRecipe);
router.get("/all_by_app/:id",getAllByApp);
router.get("/all_by_filter", getAllByFilter);

router.get("/:id", getaCategory);

router.delete("/:id", authMiddleware, isAdmin, deletecategry);

// router.put(
//   "/updatecategory/:id",
//   authMiddleware,
//   isAdmin,
//   upload.single("image"),
//   (req, res, next) => {
//     // Validate the form data
//     const formData = {
//       name: req.body.name,
//       image: req.file ? req.file.filename : "", // Convert the buffer to base64
//     };
//     // const { error} = categoryvalidation.updateCategory.validate(req);

//     // if (error) {
//     //   return res.status(400).json({ error: 'UserID is required' });
//     // }

//     const { error } = categoryvalidation.updateCategory.validate(formData);

//     if (error) {
//       // Handle validation errors
//       return res
//         .status(httpStatus.BAD_REQUEST)
//         .json({ error: error.details[0].message });
//     }
//     next();
//   },
//   updateCategory
// );
router.put(
  "/updatecategory/:id",
  authMiddleware,
  isAdmin,
  validate(categoryvalidation.updateCategory),
  updateCategory
);
module.exports = router;
