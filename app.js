const express = require("express");

const app = express();

app.use("/add-prod", (req, res, next) => {
  res.send("<h1> Add product page</h1>");
});
app.use("/", (req, res, next) => {
  res.send("<h1> Another middleware</h1>");
});

app.listen(3000);
