const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order_feature",
    {
      quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      }
    },
    {
      tableName: "order_feature",
      timestamps: true,
    }
  );
};
