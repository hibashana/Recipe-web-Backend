const express = require('express');
const { createCategory, getaCategory, getallcategory, deletecategry} = require('../controller/category');
const { upload } = require('../controller/uploadCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/addcategory",createCategory,upload.single('image'));
router.get("/getall",getallcategory);
router.delete('/:id',deletecategry);
router.get('/:id',getaCategory);
///

module.exports = router;