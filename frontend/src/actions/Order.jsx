import _ from 'lodash'

import feathersClient from './../feathersClient'

//import constants
import * as constantOrder from '../constants/Order'

//init info
const ORDER_INFO = 'ORDER_INFO'

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

  getOrders(objFilter = null) {
    return function (dispatch) {
      dispatch({type: constantOrder.ORDER_GET_DATA_PROCESSING})
      const query = {
        query: {
          $sort: {id: 0},
          $limit: 1000
        }
      }

      if(!_.isNaN(objFilter)) {
        query.query = {...query.query, ...objFilter}
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
        .then(response => {
          //re-update list orders
          dispatch({type: constantOrder.ORDER_UPDATE_SUCCESS, payload: response})
        }).catch(error => {
        dispatch({type: constantOrder.ORDER_UPDATE_FAIL, payload: error.message})
      })
    }
  }
  
  addOrderToLocalStorage(objOrderInfo) {
    localStorage.setItem(ORDER_INFO, JSON.stringify(objOrderInfo))
  }

  setOrder(objOrderInfo) {
    return dispatch => {
      this.addOrderToLocalStorage(objOrderInfo)
      dispatch({type: constantOrder.ORDER_SET_ORDER_INFO_SUCCESS, payload: objOrderInfo})
    }
  }

  generateOrder() {
    return function (dispatch) {
      let objOrderInfo = localStorage.getItem(ORDER_INFO)
      //check exist cart key
      if(_.isNil(objOrderInfo)) {
        localStorage.setItem(ORDER_INFO, JSON.stringify({}))
        dispatch({type: constantOrder.ORDER_SET_ORDER_INFO_SUCCESS, payload: {}})
      } else {
        dispatch({type: constantOrder.ORDER_SET_ORDER_INFO_SUCCESS, payload: JSON.parse(objOrderInfo)})
      }
    }
  }
}

export default new ActionOrder()