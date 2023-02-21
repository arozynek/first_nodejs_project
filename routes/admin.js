const express = require("express");
const router = express.Router();

const products = [];
router.get("/add-prod", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add products",
    path: '/admin/add-prod',
    activeAddProduct: true,
    formCSS: true,
    productCSS: true,
  });
});
router.post("/add-prod", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
