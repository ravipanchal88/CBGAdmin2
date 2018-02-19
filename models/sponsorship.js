module.exports = function(sequelize, DataTypes) {
  return(sequelize.define('sponsorship', {
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
          ]
          }));
        }
      },
      classMethods: {
        associate: function(models) {
          models.sponsorship.belongsTo(model.student);
          models.sponsorship.belongsTo(model.donor);
      }
    },
    // classMethods: {
    //   associate: function(models) {
    //    models.sponsorship.belongsToMany(models.donor,{
    //     foreignKey:"donor_id", as: "Donor"
    //    });
    //    // models.donor.belongsTo(models.student);
    //  }
    // },
  }));
}; 



