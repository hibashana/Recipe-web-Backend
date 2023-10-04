const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createSteps, getallStep, getaSteps, deleteSteps, updateSteps } = require('../controller/stepsCtrl');


const router = express.Router();


router.post("/add", authMiddleware,isAdmin,createSteps);

router.get("/getall",getallStep);
router.get("/:id",getaSteps);

router.delete('/:id',authMiddleware,isAdmin,deleteSteps);

router.put('/:id',authMiddleware,isAdmin,updateSteps);


module.exports = router;