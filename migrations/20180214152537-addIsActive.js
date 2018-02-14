'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.addColumn('students', 'IsActive', {
      type:         Sequelize.BOOLEAN,
      defaultValue: true
    }));
  },

  down: function(queryInterface, Sequelize) {
    return(queryInterface.removeColumn('students', 'IsActive'));
  }
};