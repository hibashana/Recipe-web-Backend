const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getaUser,
  updateUserDetails,
  deleteUser,
  updatePassword,
  loginAdmin,
  updateisActive,
  getAllByFilter,
} = require("../../controller/userAuth");
const { authMiddleware, isAdmin } = require("../../middleware/authMiddleware");
const validate = require("../../middleware/validation");
const uservalidation = require("../../validation/user-Validation");

const router = express.Router();

router.post("/register", validate(uservalidation.createUser), createUser);
router.post("/login", validate(uservalidation.loginUser), loginUser);
router.post("/admin-login", validate(uservalidation.loginAdmin), loginAdmin);

router.get(
  "/alluser",
  authMiddleware,
  isAdmin,
  validate(uservalidation.getAllUser),
  getAllUser
);
router.get("/all_by_filter", getAllByFilter);
router.get("/:id", validate(uservalidation.getaUser), getaUser);

router.put(
  "/updatePassword",
  authMiddleware,
  validate(uservalidation.updatePassword),
  updatePassword
);
router.put(
  "/:id",
  validate(uservalidation.updateUserDetails),
  updateUserDetails
);

router.put("/changeisActive/:id", authMiddleware, isAdmin, updateisActive);

router.delete("/:id", deleteUser);

module.exports = router;
