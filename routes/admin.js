const express = require("express");
const path = require("path");
const router = express.Router();
const rootDir = require("../helper/path");

router.get("/add-prod", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
router.post("/add-prod", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
