'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
      },
      materials_required: {
          type: Sequelize.TEXT,
          allowNull: false,
          get() {
            const value = this.getDataValue('materials_required');
            return JSON.parse(value);
          },
          set(value) {
            this.setDataValue('materials_required', JSON.stringify(value));
          }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};
