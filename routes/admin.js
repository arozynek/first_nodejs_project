const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/add-prod", adminController.getAddProduct);
router.get("/products", adminController.getAdminProduct);

router.post("/add-prod", adminController.postAddProduct);

module.exports = router;
