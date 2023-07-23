const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "coupon_user",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "coupon_user",
    }
  );
};