'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Posts',{
      id:{type:Sequelize.DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
      text:{type:Sequelize.DataTypes.STRING},
      data:{type:Sequelize.DataTypes.INTEGER},
      completed:{type:Sequelize.DataTypes.BOOLEAN, defaultValue: false},
      createdAt:{type:Sequelize.DataTypes.DATE},
      updatedAt:{type:Sequelize.DataTypes.DATE},
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
