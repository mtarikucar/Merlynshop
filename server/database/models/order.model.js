const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "order",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      status: {
        type: DataTypes.ENUM("pending", "processing", "delivered", "canceled"),
        defaultValue: "pending",
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      payment_verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "order",
      createdAt: true,
      updatedAt: true,
      timestamps: true,
    }
  );
};
