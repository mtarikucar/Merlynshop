const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cart",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("open", "closed"),
        defaultValue: "open",
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "cart",
      createaAt: true,
      updatedAt: true,
      timestamps: true,
    }
  );
};
