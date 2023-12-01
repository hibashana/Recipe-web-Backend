const express = require("express");
const {getTotalCount}=require("../../controller/homeCtrl")
const router = express.Router();

router.get("/totalCount",getTotalCount);

module.exports = router;