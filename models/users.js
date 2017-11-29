module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    email: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please enter Valid Email Address'
        },
        isUnique: function(value, next) {
          var self = this;

          User.findOne({
            where: {
              email: value
            }
          }).then(function(user) {
            console.log("in user model")
            if (user && user.id != self.id)
              return(next('Email is already registered'));
            else
              return(next());
          });
        }
      }
    },
    password: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [{min: 8}],
          msg: 'Password must be at least 8 characters'
        }
      }
    },
    name: {
      type:      DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        }
      }
    } 
  }
  //   {
  //   classMethods: {
  //     associate: function(models) {
  //       models.user.hasMany(models.imagepost);
  //     }
  //   }
  // }
  )

  return(User);
};