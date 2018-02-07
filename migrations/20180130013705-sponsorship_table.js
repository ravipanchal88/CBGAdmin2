'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.createTable('sponsorships', {
      id: {
        type:          Sequelize.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
        allowNull:     false
      },
      student_id: {
        type:      Sequelize.INTEGER,
        allowNull: false
      },
      donor_id: {
        type:      Sequelize.INTEGER,
        allowNull: false
      },
      amount: {
        type:      Sequelize.FLOAT,
        allowNull: false
      },
       year: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type:      Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type:      Sequelize.DATE,
        allowNull: false
      }
    }))
  },
  down: function(queryInterface, Sequelize) {
    return(queryInterface.dropTable('sponsorships'));
  }
};