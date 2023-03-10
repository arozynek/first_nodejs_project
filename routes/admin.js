const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/add-prod", adminController.getAddProduct);
router.get("/products", adminController.getAdminProduct);
router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/add-prod", adminController.postAddProduct);
router.post("/edit-product", adminController.postEditProduct);
router.post("/delete-prod", adminController.postDeleteProduct);

module.exports = router;
