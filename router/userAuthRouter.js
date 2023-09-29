const express = require('express');
const { createUser, loginUser, getAllUser, getaUser, updateUserDetails, deleteUser, updatePassword, getalladmindetails, loginAdmin,} = require('../controller/userAuth');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/register",createUser);
router.post("/login",loginUser);
router.post("/admin-login",loginAdmin);

router.get("/alluser",getAllUser);
router.get("/detailsofadmin",getalladmindetails);
router.get("/:id",getaUser);


// router.get("/",authenticateToken);

router.put("/updatePassword",authMiddleware,updatePassword);
router.put("/:id",updateUserDetails);


router.delete("/:id",deleteUser);

module.exports = router;