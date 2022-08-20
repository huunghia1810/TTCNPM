// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const ratings = sequelizeClient.define('ratings', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      }
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
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
  ratings.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    ratings.hasOne(models.users, { //devices.createdBy = users.id
      as: 'user',
      sourceKey: 'createdBy',
      foreignKey: 'id',
    });
    ratings.hasOne(models.orders, {
      as: 'order',
      sourceKey: 'orderId',
      foreignKey: 'id',
    })
  };

  return ratings;
};
