// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
   
    
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description:{
      type: DataTypes.STRING,
      allowNull: false
    },

    completionMessage:{
      type: DataTypes.STRING,
      allowNull: false
    },

    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    badge: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmation: {
      type: DataTypes.BOOLEAN
    }
  },
  { timestamps: false 
  });

  Task.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    
    Task.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    })
    Task.belongsTo(models.Charity, {
      foreignKey: {
        allowNull: false
      }
    });
    

      Task.hasMany(models.UserTask, {
          //do not delete user tasks because it will mess up score card
          //change status in usertask to unavailable
      })
  };

  return Task;
};
