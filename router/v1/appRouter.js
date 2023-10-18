const express = require("express");
const {
  createApp,
  getaApp,
  getallApp,
  deleteApp,
  updateApp,getAppHomeData,
} = require("../../controller/appCtrl");
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");
const { uploadApp } = require("../../controller/uploadCtrl");
const validate = require("../../middleware/validation");
const appValidation = require("../../validation/app-validation");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  isAdmin,
  uploadApp.single("image"),
  (req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
      packageName:req.body.packageName,
     
    };

    const { error } = appValidation.createApp.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },
  createApp
);

router.get("/all", getallApp);
router.get("/AppHomeData/:id",getAppHomeData)
router.get("/:id", getaApp);

router.delete("/:id", authMiddleware, isAdmin, deleteApp);

router.put(
  "/updateApp/:id",
  authMiddleware,
  isAdmin,
  uploadApp.single("image"),
  (req, res, next) => {
    // Validate the form data
    const formData = {
      name: req.body.name,
      image: req.file ? req.file.filename : "", // Convert the buffer to base64
      packageName:req.body.packageName,
    };

    const { error } = appValidation.updateApp.validate(formData);

    if (error) {
      // Handle validation errors
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  },
  updateApp
);

module.exports = router;
