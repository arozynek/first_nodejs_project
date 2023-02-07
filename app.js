const express = require("express");

const app = express();
app.use((req, res, next) => {
  console.log("The middleware");
  next();
});
app.use((req, res, next) => {
  console.log("Another middleware");
});

app.listen(3000);
