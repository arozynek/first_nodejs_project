const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helper/database");

class Cart extends Model {}
Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  },
  { sequelize, modelName: "Cart" }
);

module.exports = Cart;
