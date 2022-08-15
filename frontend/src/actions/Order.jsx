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

  getOrders() {
    return function (dispatch) {
      dispatch({type: constantOrder.ORDER_GET_DATA_PROCESSING})
      const query = {
        query: {
          $sort: {id: 1},
          $limit: 1000
        }
      }

      feathersClient.service('orders').find(query)
        .then(response => {
          dispatch({type: constantOrder.ORDER_GET_DATA_SUCCESS, payload: response})
        }).catch(error => {
        dispatch({type: constantOrder.ORDER_GET_DATA_FAIL, payload: error.message})
      })
    }
  }

  updateOrderById(id, objData) {
    return dispatch => {
      dispatch({type: constantOrder.ORDER_UPDATE_PROCESSING})

      feathersClient.service('orders').patch(id, objData)
        .then(response => { //nghianh processing
          //re-update list orders
          //dispatch({type: constantOrder.ORDER_UPDATE_SUCCESS, payload: response})
        }).catch(error => {
        dispatch({type: constantOrder.ORDER_UPDATE_FAIL, payload: error.message})
      })
    }
  }
}

export default new ActionOrder()