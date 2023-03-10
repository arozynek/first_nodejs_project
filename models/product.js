const fs = require("fs");
const path = require("path");
const notifier = require("node-notifier");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProdsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    getProdsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id) {
    getProdsFromFile((products) => {
      if (id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === id
        );
        const deletedProducts = [...products];
        deletedProducts.splice(existingProductIndex, 1);
        fs.writeFile(p, JSON.stringify(deletedProducts), (err) => {
          console.log(err);
        });
      } else {
        notifier.notify({
          title: "Something went wrong..",
          message: "This product doesn't exist",
        });
      }
    });
  }

  static fetchAll(cb) {
    getProdsFromFile(cb);
  }

  static findById(id, cb) {
    getProdsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      cb(product);
    });
  }
};
