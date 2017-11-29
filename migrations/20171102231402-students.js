module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.createTable('students', {
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
      parentname: {
        type:      Sequelize.STRING,
        allowNull: false
      },
       address: {
        type:      Sequelize.STRING,
        allowNull: true
      },
       village: {
        type:      Sequelize.STRING,
        allowNull: false
      },
       gender: {
        type:      Sequelize.STRING,
        allowNull: false
      },
       dob: {
        type:      Sequelize.DATE,
        allowNull: false
      },
       income: {
        type:      Sequelize.INTEGER

      },
       interest: {
        type:      Sequelize.STRING

      },
       aadharnbr: {
        type:      Sequelize.INTEGER

      },
       housetype: {
        type:      Sequelize.STRING

      },
       financialposition: {
        type:      Sequelize.STRING

      },
       studycommitment: {
        type:      Sequelize.STRING,
        allowNull: false
      },
       activity: {
        type:      Sequelize.STRING
      },
       total: {
        type:      Sequelize.STRING
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
    return(queryInterface.dropTable('students'));
  }
};