'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users',{
      id:{type:Sequelize.DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
      email:{type:Sequelize.DataTypes.STRING, unique:true},
      password:{type:Sequelize.DataTypes.STRING},
      role:{type:Sequelize.DataTypes.STRING, defaultValue: "USER"},
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
    await queryInterface.dropTable('Users')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
