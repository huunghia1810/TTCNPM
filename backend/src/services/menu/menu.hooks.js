const { authenticate } = require('@feathersjs/authentication').hooks
const { disallow } = require('feathers-hooks-common')

const attachUserInfo = require('./../../hooks/attach-user-info')
const menuPrepareData = require('./../../hooks/menu/menu-prepare-data')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      authenticate('jwt'),
      attachUserInfo(),
      menuPrepareData(),
    ],
    update: [
      authenticate('jwt'),
      attachUserInfo()
    ],
    patch: [
      authenticate('jwt'),
      attachUserInfo(),
      menuPrepareData(),
    ],
    remove: [
      disallow()
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
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
}
