// server/models/coupon.js
const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define(
    "coupon",
    {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      minOrderAmount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      discountAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "coupon",
      timestamps: true,
    }
  );
};