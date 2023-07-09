const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "comment",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
          },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      tableName: "comment",
    }
  );
};
