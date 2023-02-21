const express = require("express");
const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", {
    pageTitle: "Shop",
    path: '/',
    prods: products,
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
