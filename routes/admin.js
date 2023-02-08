const express = require("express");

const router = express.Router();

router.get("/add-prod", (req, res, next) => {
  res.send(
    "<h1> Add product page</h1><form action='/admin/add-prod' method='POST'><input type='text' name='title'><button type='submit'>Add product</button></form>"
  );
});

router.post("/add-prod", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
