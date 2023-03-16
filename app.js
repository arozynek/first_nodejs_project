const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./helper/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorCtrl = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorCtrl.getError);

app.listen(3000);
