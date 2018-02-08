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
    },
    imageFilename: {
      type:         DataTypes.STRING,
      allowNull:    false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Image is required'
        }
      }
    },
    IsSponsored: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    defaultScope: {
      order: [['firstname', 'asc']]
    },
    classMethods: {
      associate: function(models) {
        models.student.belongsTo(models.donor);
        models.student.belongsTo(models.sponsorship);
      }
    },  
    getterMethods: {
      url: function() {
        return(`/student/index/${this.slug}`);
      },
      imageUrl: function() {
        return(`/images/studentimages/${this.imageFilename}`);
      },
      imageThumbnailUrl: function() {
        return(`${this.imageUrl}-thumbnail`);
      }
    },
  })
  return(Student);
};


