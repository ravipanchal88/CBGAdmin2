module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('student', {
    firstname: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter firstname'
        }
      }
    },
    lastname: {
      type:      DataTypes.STRING,
      allowNull: false
    },
    parentname: {
      type:      DataTypes.STRING,
      allowNull: true
    },
    address: {
      type:      DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Please enter address'
        }
      }
    },
    village: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter village name'
        }
      }
    },
    dob: {
      type:      DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please Enter DOB'
        }
      }
    },
    gender: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please select Gender'
        }
      }
    },
    income: {
      type:      DataTypes.INTEGER,
      allowNull: true
    },
    aadharnbr: {
      type:      DataTypes.STRING,
      allowNull: true
    },
    housetype: {
      type:      DataTypes.STRING,
      allowNull: true
    },
    interest: {
      type:      DataTypes.STRING,
      allowNull: true
    },
    financialposition: {
      type:      DataTypes.STRING,
      allowNull: true
    },
    studycommitment: {
      type:      DataTypes.STRING,
      allowNull: false
    },
    total: {
      type:      DataTypes.STRING,
      allowNull: true
    },
    activity: {
      type:      DataTypes.STRING,
      allowNull: true
    },
    comments: {
      type:      DataTypes.STRING,
      allowNull: true
    }
  })
  return(Student);
};