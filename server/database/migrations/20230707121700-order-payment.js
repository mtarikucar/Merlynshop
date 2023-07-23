"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("order", "payment_id", {
      type: Sequelize.STRING,
      defaultValue: null,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("order", "payment_id");
  },
};
