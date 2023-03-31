const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helper/database");

class OrderItem extends Model {}
OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: DataTypes.INTEGER,
  },
  { sequelize, modelName: "orderItem" }
);

module.exports = OrderItem;
