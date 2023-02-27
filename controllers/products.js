const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add products",
    path: "/admin/add-prod",
    activeAddProduct: true,
    formCSS: true,
    productCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProduct = (req, res, next) => {
  const products = Product.fetchAll();
  res.render("shop", {
    pageTitle: "Shop",
    path: "/",
    prods: products,
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
