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
      size: {
        type: DataTypes.ENUM("xs", "s","m","l","xl","xxl"),
        defaultValue: "m",
        allowNull: false,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.SMALLINT,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    },
    {
      tableName: "products",
      createdAt: true,
      updatedAt: true
    }
  );
   //force: true
};