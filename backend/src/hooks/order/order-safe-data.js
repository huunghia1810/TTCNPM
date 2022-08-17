/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')

const ACTIONS = {
  GENERATE_KEY: 'GENERATE_KEY',
  PARSE_KEY: 'PARSE_KEY',
}

const ORDER_STATUS = {
  DRAFT: 'DRAFT',
  NEW: 'NEW',
  PREPARING: 'PREPARING',
  SERVED: 'SERVED',
  DONE: 'DONE',
}

module.exports = function orderSafeData(options = {}) {
  return async (context) => {
      const { app, data, params } = context
      const { identityKey, cartInfo, customerInfo, status = ORDER_STATUS.NEW } = data

    const identityInfo = await app.service('identity').create({
      strKey: identityKey,
      action: ACTIONS.PARSE_KEY
    })
    const slotNumber = identityInfo.split('__')[1]

    //prepare data
    const safeData = {
      slotNumber,
      cartInfo: JSON.stringify(_.omit(cartInfo, ['status'])),
      customerName: customerInfo.fullName,
      customerPhone: customerInfo.phone,
      status,
    }

    context.data = safeData

    return context
  }
}
