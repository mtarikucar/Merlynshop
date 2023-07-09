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
      payment_id:{
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      tableName: "order",
      timestamps: true,
    }
  );
};
