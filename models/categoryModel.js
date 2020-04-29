
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    // The email cannot be null, and must be a proper email before creation
    
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }

  },
  {timestamps: false});

  Category.associate = function(models){
    

    Category.hasMany(models.Task, {
      
    })
  }


  return Category;
};
