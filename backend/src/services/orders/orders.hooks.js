const { authenticate } = require('@feathersjs/authentication').hooks;

const orderValidateData = require('./../../hooks/order/order-validate-data')
const orderSafeData = require('./../../hooks/order/order-safe-data')
const attachRatingData = require('./../../hooks/order/attach-rating-data')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      orderValidateData(),
      orderSafeData(),
    ],
    update: [
      authenticate('jwt')
    ],
    patch: [
      authenticate('jwt')
    ],
    remove: [
      authenticate('jwt')
    ]
  },

  after: {
    all: [],
    find: [attachRatingData()],
    get: [attachRatingData()],
    create: [],
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
