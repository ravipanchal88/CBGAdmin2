module.exports = function(sequelize, DataTypes) {
  var Sponsorship = sequelize.define('sponsorship', {
    student_id: {
      type:      DataTypes.INTEGER,
      allowNull: false
    },
    donor_id: {
      type:      DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type:      DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter AMOUNT'
        }
      } 
    },
    year: {
      type:      DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Please enter Year'
        }
      }   
    }
  },  
    {
    defaultScope: {
        order: [['createdAt', 'ASC']]
        },
      classMethods: {
        associate: function(models) {
          models.sponsorship.belongsTo(models.student);
          models.sponsorship.belongsTo(models.donor);
        }
      }, 
      getterMethods: {
        url: function() {
        return(`/student/sponsorstudent/${this.slug}`);
        }
      }
    })
    return(Sponsorship);
};

