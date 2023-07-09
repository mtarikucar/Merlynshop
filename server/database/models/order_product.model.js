const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order_product",
    {
      quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      }
    },
    {
      tableName: "order_product",
      timestamps: true,
    }
  );
};
