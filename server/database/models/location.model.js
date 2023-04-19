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

      },
      longitude: {
        type: DataTypes.FLOAT,
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
