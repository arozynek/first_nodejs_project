const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add products",
    path: "/admin/add-prod",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );
  product
    .save()
    .then(res.redirect("/"))
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/error");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit product",
      path: "/admin/edit-product",
      editing: editMode,
      editingProduct: product,
    });
  });
};
exports.postEditProduct = (req, res, next) => {
  const updatedProduct = new Product(
    req.body.productId,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
  );
  updatedProduct.save();
  res.redirect("products");
};

exports.postDeleteProduct = (req, res, next) => {
  prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("products");
};

exports.getAdminProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
