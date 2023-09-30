const express = require('express');
const { createBanner, getaBanner, getallBanner, deleteBanner, updateBanner } = require('../controller/bannerCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../controller/uploadCtrl');

const router = express.Router();



router.post("/addbanner", authMiddleware,isAdmin,upload.single('image'),createBanner);

router.get("/getall",getallBanner);
router.get('/:id',getaBanner);

router.delete('/:id',authMiddleware,isAdmin,deleteBanner);

router.put('/updatebanner/:id',authMiddleware,isAdmin,upload.single('image'),updateBanner);

module.exports = router;