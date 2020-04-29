// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
// const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var Charity = sequelize.define("Charity", {
    // The email cannot be null, and must be a proper email before creation

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },

    phoneNumber: {
      type: DataTypes.STRING
    },

    charUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },

    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
  },
    { timestamps: false 
    });

  Charity.associate = function (models) {


    Charity.hasMany(models.Task, {
      onDelete: "cascade"
    })
    Charity.hasMany(models.User, {
      
    })
  }



  return Charity;
};
