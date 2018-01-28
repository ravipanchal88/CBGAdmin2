'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.addColumn('students', 'imageFilename', {
      type:         Sequelize.STRING,
      allowNull:    false,
      defaultValue: ''
    }));
  },

  down: function(queryInterface, Sequelize) {
    return(queryInterface.removeColumn('students', 'imageFilename'));
  }
};