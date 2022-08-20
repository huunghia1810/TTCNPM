/* See hooks document: https://docs.feathersjs.com/guides/basics/hooks.html */
const _ = require('lodash')
const moment = require('moment')

const ORDER_STATUS = {
  DRAFT: 'DRAFT',
  NEW: 'NEW',
  PREPARING: 'PREPARING',
  SERVED: 'SERVED',
  DONE: 'DONE',
}

module.exports = function changeOrderStatus(options = {roles: []}) {
  return async (context) => {
    const { app, data, params, result } = context
    const dataOrder = await app.service('orders').patch(data.orderId, { status: ORDER_STATUS.DONE });

    result.order = dataOrder
    return context
  }
}
