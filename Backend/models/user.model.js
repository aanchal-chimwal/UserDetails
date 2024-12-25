const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connect");
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
    },
    age: {
      type: DataTypes.INTEGER,
      required: true,
    },
    phoneNo: {
      type: DataTypes.STRING,
      required: true,
    },
  },
  { tableName: "user", timestamps: false }
);
module.exports = User;
