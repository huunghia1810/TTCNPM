const { disallow } = require('feathers-hooks-common')

const changeOrderStatus = require('./../../hooks/rating/change-order-status')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [disallow()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [changeOrderStatus()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
