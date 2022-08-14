import _ from 'lodash'

import * as constantOrder from '../constants/Order'

import feathersClient from './../feathersClient'

class ActionOrder {
  
  sendOrder(data, cb = false) {
    return dispatch => {
      dispatch({type: constantOrder.ORDER_ADD_DATA_PROCESSING})

      feathersClient.service('orders').create(data).then(res => {
        dispatch({type: constantOrder.ORDER_ADD_DATA_SUCCESS, payload: res})
        if(typeof cb == 'function') {
          cb(true, res)
        }
      }).catch(error => {
        dispatch({type: constantOrder.ORDER_ADD_DATA_FAIL, payload: error})
        cb(false, error)
      })
    }
  }
}

export default new ActionOrder()