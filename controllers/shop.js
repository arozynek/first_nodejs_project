const Product = require("../models/product");
const Order = require("../models/order");
// const User = require("../models/user");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.render("shop/product-list", {
        prods: result,
        pageTitle: "All products in shop",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      console.log(product);
      res.render(`shop/product-detail`, {
        prod: product,
        pageTitle: product.title,
        path: `/products/${prodId}`,
      });
    })
    .catch((err) => console.log(err));
};
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.render("shop/index", {
        prods: result,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts().then((products) => {
        res.render("shop/cart", {
          products: products,
          cart: cart,
          path: "/cart",
          pageTitle: "Your cart",
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((resuult) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};
exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    let qtty;
    const fetchedCart = await req.user.getCart();
    const fetchedProduct = await fetchedCart.getProducts({
      where: { id: prodId },
    });
    const setProdAndQtty = async () => {
      if (fetchedProduct.length) {
        const product = fetchedProduct[0];
        console.log(product);
        const oldQtty = product.cartItem.quantity;
        qtty = oldQtty + 1;
        return { product, qtty };
      } else {
        const product = await Product.findByPk(prodId);
        qtty = 1;
        return { product, qtty };
      }
    };
    const { product } = await setProdAndQtty();
    await fetchedCart.addProduct(product, {
      through: { quantity: qtty },
    });
    await res.redirect("/cart");
  } catch (err) {
    console.log(err);
  }

  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(product.id, product.price);
  // });
  // res.redirect("/cart");
};
exports.postOrder = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();
    await order
      .addProducts(
        products.map((product) => {
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        })
      )
      .then(() => {
        return cart.setProducts(null);
      });
    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};
