// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var UserTask = sequelize.define("UserTask", {
    completionStatus:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN
    }
  },{timestamps: false});

  UserTask.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    UserTask.belongsTo(models.Task, {
      foreignKey: {
        allowNull: false
      }
    });
    UserTask.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
  };

  return UserTask;
};
