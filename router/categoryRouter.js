const express = require('express');
const { createCategory, getaCategory, getallcategory, deletecategry, updateCategory, searchCategory} = require('../controller/category');
const { upload } = require('../controller/uploadCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const validate=require('../middleware/validation');
const categoryvalidation=require('../validation/category-validation')


const router = express.Router();


router.post("/addcategory",validate(categoryvalidation.createCategory), authMiddleware, isAdmin,upload.single('image'),createCategory);

router.get("/search",searchCategory);

router.get("/getall",getallcategory);
router.get('/:id',validate(categoryvalidation.getaCategory),getaCategory);

router.delete('/:id',authMiddleware,isAdmin,deletecategry);


router.put('/updatecategory/:id',authMiddleware,isAdmin,upload.single('image'),validate(categoryvalidation.updateCategory),updateCategory);

module.exports = router;