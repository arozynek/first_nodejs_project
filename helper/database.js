const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://pannaannar:testpass1234@cluster0.eszhtgf.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected to db");
      cb(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
