'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{
      type:'FOREIGN KEY',
      name:'city_fkey_constraint_name',
      fields: ['cityId'],
      references:{
        table:'cities',
        field:'id'
      },
      onDelete:'CASCADE'
    });
  },


//to revert back the changes (undo)
  async down (queryInterface, Sequelize) {
      await queryInterface.removeConstraint('Airports','city_fkey_constraint_name');
  }
};
