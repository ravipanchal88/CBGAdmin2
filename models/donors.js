module.exports = function(sequelize, DataTypes) {
  var Donor = sequelize.define('donor', {
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
    address1: {
      type:      DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Please enter address line 1'
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
          msg: 'Please enter city'
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
    getterMethods: {
      url: function() {
        return(`/donor/index/${this.slug}`);
      }
    },
  })
  return(Donor);
};
   //    imageUrl: function() {
   //      return(`/images/posts/${this.imageFilename}`);
   //    },
   //    imageThumbnailUrl: function() {
   //      return(`${this.imageUrl}-thumbnail`);
   //    }
   //  },
   // getterMethods: {
   //    url: function() {
   //      return(`/student/index${this.slug}`);
   //    }
  //     imageUrl: function() {
  //       return(`/images/posts/${this.imageFilename}`);
  //     },
  //     imageThumbnailUrl: function() {
  //       return(`${this.imageUrl}-thumbnail`);
  //     }
  //   },
  //return(Student);
