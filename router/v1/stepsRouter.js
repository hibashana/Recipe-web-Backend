const express = require('express');
const { authMiddleware, isAdmin } = require('../../middleware/authMiddleware');
const { createSteps, getallStep, getaSteps, deleteSteps, updateSteps, getAllByFilter } = require('../../controller/stepsCtrl');
const validate=require('../../middleware/validation');
const stepsValidation=require('../../validation/steps-validation')

const router = express.Router();


router.post("/add", authMiddleware,isAdmin,validate(stepsValidation.createSteps),createSteps);

router.get("/getall",getallStep);
router.get("/all_by_filter", getAllByFilter);


router.get("/:id",getaSteps);

router.delete('/:id',authMiddleware,isAdmin,deleteSteps);

router.put('/update/:id',authMiddleware,isAdmin,updateSteps);



module.exports = router;