const express = require("express");
const {
  createBanner,
  getaBanner,
  getallBanner,
  deleteBanner,
  updateBanner,
  getAllByApp,
  getAllByFilter,
  createBannerRecipe,
  deleteBannerRecipe,
} = require("../../controller/bannerCtrl");
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");
const { uploadBanner } = require("../../controller/uploadCtrl");
const validate = require("../../middleware/validation");
const bannerValidation = require("../../validation/banner-validation");

const router = express.Router();

router.post(
  "/addbanner",
  authMiddleware,
  isAdmin,
  uploadBanner.single("image"),
  (req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
      appID: req.body.appID,
    };

    const { error } = bannerValidation.createBanner.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },
  createBanner
);

//For recipes By banner
router.post("/create_banner_recipe",authMiddleware, isAdmin,createBannerRecipe);
router.delete("/delete_banner_recipe/:id",authMiddleware, isAdmin,deleteBannerRecipe);


router.get("/getall", getallBanner);
router.get("/all_by_app/:id", getAllByApp);
router.get("/all_by_filter", getAllByFilter);
router.get("/:id", getaBanner);

router.delete("/:id", authMiddleware, isAdmin, deleteBanner);

router.put(
  "/updatebanner/:id",
  authMiddleware,
  isAdmin,
  uploadBanner.single("image"),
  (req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      
      appID: req.body.appID,
    };

    const { error } = bannerValidation.updateBanner.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },
  updateBanner
);

module.exports = router;
