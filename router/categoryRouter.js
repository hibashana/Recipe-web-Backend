const express = require('express');
const { createCategory, getaCategory, getallcategory, deletecategry } = require('../controller/category');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/addcategory",authMiddleware,isAdmin,createCategory);
router.get("/getall",getallcategory);
router.delete('/:id',deletecategry);
router.get('/:id',getaCategory);

module.exports = router;