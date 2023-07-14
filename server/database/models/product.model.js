const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "product",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      thumbnail: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.SMALLINT,
      },
      discountedPrice: {
        type: DataTypes.SMALLINT,
      },
      
      brand: {
        type: DataTypes.STRING,
        defaultValue: "merlyn",
        allowNull: false,
      },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );
   
};