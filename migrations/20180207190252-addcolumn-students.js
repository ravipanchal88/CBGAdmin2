'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.addColumn('students','IsSponsored',{
    type: Sequelize.BOOLEAN,
    defaultValue: false
   })
  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.removeColumn('students','IsSponsored')


  }
};
