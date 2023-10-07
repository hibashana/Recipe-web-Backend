const express = require('express');
const { createCategory, getaCategory, getallcategory, deletecategry, updateCategory, searchCategory} = require('../controller/category');
const { upload } = require('../controller/uploadCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const validate=require('../middleware/validation');
const categoryvalidation=require('../validation/category-validation')


const router = express.Router();


router.post("/addcategory",authMiddleware, isAdmin,upload.single('image'),(req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
    };

    const { error } = categoryvalidation.create.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },createCategory);

router.get("/search",searchCategory);

router.get("/getall",getallcategory);
router.get('/:id',validate(categoryvalidation.getaCategory),getaCategory);

router.delete('/:id',authMiddleware,isAdmin,deletecategry);


router.put('/updatecategory/:id',authMiddleware,isAdmin,upload.single('image'),(req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
    };

    const { error } = categoryvalidation.updateCategory.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },updateCategory);

module.exports = router;