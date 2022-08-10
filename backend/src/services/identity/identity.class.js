const _ = require('lodash')
const { Service } = require('feathers-sequelize')
const errors = require('@feathersjs/errors')
const Cryptr = require('cryptr')

const ACTIONS = {
  GENERATE_KEY: 'GENERATE_KEY',
  PARSE_KEY: 'PARSE_KEY',
}
const SEC_KEY = 'NghiaNH'

const cryptr = new Cryptr(SEC_KEY)

exports.Identity = class Identity extends Service {

  setup(app) {
    this.app = app
  }

  async create(data, params) { //overwrite method post
    //let { action } = params.query
    const { action = ACTIONS.GENERATE_KEY } = data
    let res = {}

    switch (action) {
      case ACTIONS.PARSE_KEY:
        res = this._parseIdentityKey(data)
        break
      case ACTIONS.GENERATE_KEY:
      default:
        res = this._handleGenerateIdentityKey(data)
        break
    }

    return res
  }

  _handleGenerateIdentityKey(data) {
    const { slotNumber } = data
    if(_.isNil(slotNumber)) {
      throw new errors.BadRequest(`Missing params`)
    }

    const encryptedString = cryptr.encrypt(`ORDER_SYS__${slotNumber}`)
    return encryptedString
  }

  _parseIdentityKey(data) {
    const { strKey } = data
    if(_.isNil(strKey)) {
      throw new errors.BadRequest(`Missing param`)
    }

    const decryptedString = cryptr.decrypt(strKey)
    return decryptedString
  }
};
