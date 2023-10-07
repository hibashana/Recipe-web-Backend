const express = require('express');
const { createBanner, getaBanner, getallBanner, deleteBanner, updateBanner } = require('../controller/bannerCtrl');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../controller/uploadCtrl');
const validate=require('../middleware/validation');
const bannerValidation=require('../validation/banner-validation')

const router = express.Router();



router.post("/addbanner", authMiddleware,isAdmin,upload.single('image'),(req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
    };

    const { error } = bannerValidation.createBanner.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },createBanner);

router.get("/getall",getallBanner);
router.get('/:id',getaBanner);

router.delete('/:id',authMiddleware,isAdmin,deleteBanner);

router.put('/updatebanner/:id',authMiddleware,isAdmin,upload.single('image'),(req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
    };

    const { error } = bannerValidation.updateBanner.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },updateBanner);

module.exports = router;