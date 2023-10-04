const express = require('express');
const { createCategory, getaCategory, getallcategory, deletecategry, updateCategory, searchCategory} = require('../controller/category');
const { upload } = require('../controller/uploadCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');


const router = express.Router();


router.post("/addcategory", authMiddleware, isAdmin,upload.single('image'),createCategory);

router.get("/search",searchCategory);

router.get("/getall",getallcategory);
router.get('/:id',getaCategory);

router.delete('/:id',authMiddleware,isAdmin,deletecategry);


router.put('/updatecategory/:id',authMiddleware,isAdmin,upload.single('image'),updateCategory);

module.exports = router;