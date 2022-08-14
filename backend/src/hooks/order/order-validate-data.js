/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')

const { BadRequest } = require('@feathersjs/errors')

const ACTIONS = {
  GENERATE_KEY: 'GENERATE_KEY',
  PARSE_KEY: 'PARSE_KEY',
}

module.exports = function orderValidateData(options = {}) {
  return async (context) => {
      const { app, data, params } = context
      const { identityKey, cartInfo, customerInfo } = data

      if(_.isUndefined(identityKey) || _.isUndefined(cartInfo) || _.isUndefined(customerInfo)) {
        throw new BadRequest(`Missing info`)
      }

    const identityInfo = await app.service('identity').create({
      strKey: identityKey,
      action: ACTIONS.PARSE_KEY
    })
    //const slotNumber = identityInfo.split('__')[1]

    return context
  }
}
