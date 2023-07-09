const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product_feature",
    {
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
          allowNull: false,
          type: DataTypes.STRING,
        },
    },
    {
      tableName: "product_feature",
    }
  );
};
