const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "feature",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "feature",
    }
  );
};
