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
      type:      DataTypes.BIGINT,
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
      allowNull:    true
    },
    IsSponsored: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    
    cbg_id:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'CBG ID is Required'
          }
      }
    },

    standard:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'standard is required'
          }
      }
    },

    division :{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
          notEmpty: {
            msg: 'division is required'
          }
      }
    },

    guardian_occupation :{
      type: DataTypes.STRING,
      allowNull: true
    },
     membersinfamily :{
      type: DataTypes.INTEGER,
      allowNull: true
    },
     district :{
      type: DataTypes.STRING,
      allowNull: true
    },
     taluka :{
      type: DataTypes.STRING,
      allowNull: true
    },
     pincode :{
      type: DataTypes.INTEGER,
      allowNull: true
    },
     mobile_nbr :{
      type: DataTypes.STRING,
      allowNull: true
    },
     ambition :{
      type: DataTypes.STRING,
      allowNull: true
    },
     referredby :{
      type: DataTypes.STRING,
      allowNull: true
    },
     examination_marks :{
      type: DataTypes.INTEGER,
      allowNull: true
    },
     priority :{
      type: DataTypes.STRING,
      allowNull: true
    },
      IsActive :{
      type: DataTypes.BOOLEAN,
      defaultValue : true
    }
////
  }, {
    defaultScope: {
      order: [['firstname', 'asc']]
    },
    classMethods: {
      associate: function(models) {
        models.student.belongsTo(models.donor);
        models.student.hasMany(models.sponsorship);
      }
    },  
    getterMethods: {
      url: function() {
        return(`/student/index/${this.slug}`);
      },
      imageUrl: function() {
        //return(`/images/studentimages/${this.imageFilename}`);
        return(`https://cbgfoundation.s3.amazonaws.com/studentimages/${this.cbg_id}`);
      },
      imageThumbnailUrl: function() {
        return(`${this.imageUrl}-thumbnail`);
      },
      getStudentID : function() {
          return(this.student_id);
      },
      setDateFormat : function() {
          return(this.dob, "dd-mmm-yyyy");
      }
    },
  })
  return(Student);
};


