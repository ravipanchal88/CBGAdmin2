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
        //order: [['createdAt', 'ASC']]
        },
      classMethods: {
        associate: function(models) {
          models.sponsorship.hasMany(models.student);
          models.sponsorship.belongsTo(models.donor);
        }
      }, 
      getterMethods: {
        url: function() {
        return(`/student/sponsorstudent/${this.slug}`);
        },
        getStudentID : function() {
          return(this.student_id);
        },
        findWithStudentId: function(student_id) {
        return(this.findAll({
          where: {
                Id: student_id
          },
          include: [
          // sequelize.models.user,
            sequelize.models.student
          ],
        }));
      } 
      }
    })
    return(Sponsorship);
};

