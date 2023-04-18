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
        type: DataTypes.ENUM("pending", "processing", "delivered"),
        defaultValue: "pending",
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },

    
    {
      tableName: "order",
      createaAt: true,
      updatedAt: true,
      timestamps: true,
    }
  );
};
