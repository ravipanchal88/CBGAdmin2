'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return [
          queryInterface.addColumn(
            'students',
            'cbg_id',
                {
                type: Sequelize.STRING,
                allowNull:     false,
                defaultValue: ' '
                }
            ),
          queryInterface.addColumn(
            'students',
            'standard',
                {
                type: Sequelize.STRING,
                allowNull:     false,
                defaultValue: ' '
                }
            ),
          queryInterface.addColumn(
            'students',
            'division',
                {
                type: Sequelize.STRING,
                allowNull:     false,
                defaultValue: ' '
                }   
            ),
          queryInterface.addColumn(
            'students',
            'guardian_occupation',
                {
                type: Sequelize.STRING,
                allowNull:     true
                }
            ),   
         
          queryInterface.addColumn(
            'students',
            'membersinfamily',
                {
                type: Sequelize.INTEGER,
                allowNull:     true
                }
            ), 
          queryInterface.addColumn(
            'students',
            'pincode',
                {
                type: Sequelize.INTEGER,
                allowNull:     true
                }
            ),  
          queryInterface.addColumn(
            'students',
            'district',
                {
                type: Sequelize.STRING,
                allowNull:     true
                }
            ),    
          queryInterface.addColumn(
            'students',
            'taluka',
                {
                type: Sequelize.STRING,
                allowNull:     true
                }
            ),  
        
          queryInterface.addColumn(
            'students',
            'mobile_nbr',
                {
                type: Sequelize.STRING,
                allowNull:     true
                }
            ),       
          queryInterface.addColumn(
            'students',
            'ambition',
                {
                type: Sequelize.STRING,
                allowNull:     true
                }
            ),  
          queryInterface.addColumn(
            'students',
            'referredby',
                {
                type: Sequelize.STRING,
                allowNull:     true
                }
            ), 
          queryInterface.addColumn(
            'students',
            'priority',
                {
                type: Sequelize.STRING,
                allowNull:     true
                }
            ), 
          queryInterface.addColumn(
            'students',
            'examination_marks',
                {
                type: Sequelize.INTEGER,
                allowNull:     true
                }
            )
         ]; 
  },

  down: function (queryInterface, Sequelize) {
    return [
        queryInterface.removeColumn('students','cbg_id'),
        queryInterface.removeColumn('students','standard'),
        queryInterface.removeColumn('students','division'),
        queryInterface.removeColumn('students','guardian_occupation'),
        queryInterface.removeColumn('students','membersinfamily'),
        queryInterface.removeColumn('students','taluka'),
        queryInterface.removeColumn('students','district'),
        queryInterface.removeColumn('students','pincode'),
        queryInterface.removeColumn('students','mobile_nbr'),
        queryInterface.removeColumn('students','ambition'),
        queryInterface.removeColumn('students','referredby'),
        queryInterface.removeColumn('students','examination_marks'),
        queryInterface.removeColumn('students','priority')
    ];
  }
};
