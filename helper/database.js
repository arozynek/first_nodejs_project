const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-shop",
  password: "testpass1234",
});

module.exports = pool.promise();
