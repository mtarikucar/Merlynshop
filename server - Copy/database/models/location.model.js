const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "location",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      tableName: "location",
      createaAt: true,
      updatedAt: true,
      timestamps: true,
    }
  );
};
