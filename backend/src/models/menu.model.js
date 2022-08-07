// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const menu = sequelizeClient.define('menu', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    configs: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.ENUM(1, 0),
      allowNull: false,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      field: 'createdBy'
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  menu.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    menu.hasOne(models.users, { //devices.createdBy = users.id
      as: 'user',
      sourceKey: 'createdBy',
      foreignKey: 'id',
    })
  };

  return menu;
};
