// Export the database functions for the controller (sushi_controller.js)
module.exports = function (sequelize, DataTypes) {
  const Sushi = sequelize.define('Sushi', {
    sushi_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    mindfully_eaten: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Sushi
};