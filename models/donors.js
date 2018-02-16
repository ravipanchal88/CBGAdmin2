module.exports = function(sequelize, DataTypes) {
  var Donor = sequelize.define('donor', {
    firstname: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter Donors First Name'
        }
      }
    },
    lastname: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter Donors Last Name'
        }
      }

    },
    address1: {
      type:      DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Please enter Donors Address line 1'
        }
      } 
    },
    address2: {
      type:      DataTypes.STRING,
      allowNull: true,
      
    },
    city: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter Donor City'
        }
      }
    },
    state: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please Enter State'
        }
      }
    },
    zip: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please select zip'
        }
      }
    },
    email: {
      type:      DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type:      DataTypes.STRING,
      allowNull: true
    },
    comments: {
      type:      DataTypes.STRING,
      allowNull: true
    }
  }, {
    defaultScope: {
      order: [['firstname', 'asc']]
    },

  classMethods: {
      associate: function(models) {
        models.donor.belongsTo(models.student);
        models.student.belongsTo(models.sponsorship);
      }
    }, 

    getterMethods: {
      url: function() {
        return(`/donor/index/${this.slug}`);
      }
    },
  })
  return(Donor);
};

