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

module.exports = function attachRatingData(options = {roles: []}) {
  return async (context) => {
    const { app, data, params, result } = context
    let listOrderId = []
    if(result.id !== undefined) { //get by id
      listOrderId = [result.id]
    } else if(Array.isArray(result.data)) { //get list
      listOrderId = result.data.map(order => order.id)
    }
    const dataRating = await app.service('ratings').find({
      query: {
        orderId: {
          $in: listOrderId
        }
      }
    });

    if(result.id !== undefined) { //get by id
      result.rating = dataRating.data.length ? dataRating.data[0] : {}
    } else if(Array.isArray(result.data)) { //get list
      result.data.map(order => {
        const tmpDataRating = dataRating.data.find(rt => rt.orderId == order.id)
        order.rating = tmpDataRating != undefined ? tmpDataRating : {}
      })
    }

    return context
  }
}
