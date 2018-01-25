'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.createTable('donors', {
      id: {
        type:          Sequelize.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
        allowNull:     false
      },
      firstname: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      address1: {
        type:      Sequelize.STRING,
        allowNull: false
      },
       address2: {
        type:      Sequelize.STRING,
        allowNull: true
      },
       city: {
        type:      Sequelize.STRING,
        allowNull: false
      },
       state: {
        type:      Sequelize.STRING,
        allowNull: false
      },
      zip: {
        type:      Sequelize.INTEGER,
        allowNull: false
      },
       email:{
        type:      Sequelize.STRING,
        allowNull: true
      },
       phone: {
        type:      Sequelize.STRING,
        allowNull: true
      },
       comments: {
        type:      Sequelize.STRING
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
    return(queryInterface.dropTable('donors'));
  }
};