// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const ORDER_STATUS = {
  DRAFT: 'DRAFT',
  NEW: 'NEW',
  PREPARING: 'PREPARING',
  SERVED: 'SERVED',
  DONE: 'DONE',
}

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const orders = sequelizeClient.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    slotNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      }
    },
    cartInfo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1,255],
      }
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        //is: ['[a-z]','i'],        // will only allow letters
        //max: 12,                  // only allow values <= 23
        len: [10,12],
        is: /^\d*$/,
        // isIn: {
        //   args: [['en', 'zh']],
        //   msg: "Must be English or Chinese"
        // }
      }
    },
    status: {
      type: DataTypes.ENUM(ORDER_STATUS.DRAFT, ORDER_STATUS.NEW, ORDER_STATUS.PREPARING, ORDER_STATUS.SERVED, ORDER_STATUS.DONE),
      allowNull: false,
      defaultValue: ORDER_STATUS.NEW,
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
  orders.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    orders.hasOne(models.users, { //devices.createdBy = users.id
      as: 'user',
      sourceKey: 'createdBy',
      foreignKey: 'id',
    })
  };

  return orders;
};
