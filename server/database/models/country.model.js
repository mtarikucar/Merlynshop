const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "country",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "country",
      createaAt: true,
      updatedAt: true,
      timestamps: true,
    }
  );
};
