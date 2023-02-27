const express = require("express");
const productController = require("../controllers/products");
const router = express.Router();

router.get("/add-prod", productController.getAddProduct);
router.post("/add-prod", productController.postAddProduct);

module.exports = router;
