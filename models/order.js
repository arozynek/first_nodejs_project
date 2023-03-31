const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helper/database");

class Order extends Model {}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

module.exports = Order;
