const { DataTypes, STRING } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "photo",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      imgpath: {
        type: STRING,
        allowNull: false
      },
    },
    {
      tableName: "photos",
      createaAt: true,
      updatedAt: true,
      timestamps: true,
    }
  );
};
