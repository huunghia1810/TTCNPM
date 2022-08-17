import _ from 'lodash'

import * as constantCart from '../constants/Cart'

const CART_KEY = 'CART_INFO'

class ActionCart {
  generateCart() {
    return function (dispatch) {
      let objCartInfo = localStorage.getItem(CART_KEY)
      //check exist cart key
      if(_.isNil(objCartInfo)) {
        localStorage.setItem(CART_KEY, JSON.stringify({}))
        dispatch({type: constantCart.CART_SET_CART_INFO_SUCCESS, payload: {}})
      } else {
        dispatch({type: constantCart.CART_SET_CART_INFO_SUCCESS, payload: JSON.parse(objCartInfo)})
      }
    }
  }

  resetCart() {
    return dispatch => {
      localStorage.setItem(CART_KEY, JSON.stringify({}))
      dispatch({type: constantCart.CART_SET_CART_INFO_SUCCESS, payload: {}})
    }
  }
  
  addCartToLocalStorage(objCartInfo) {
    localStorage.setItem(CART_KEY, JSON.stringify(objCartInfo))
  }

  setCart(objCartInfo) {
    return dispatch => {
      this.addCartToLocalStorage(objCartInfo)
      dispatch({type: constantCart.CART_SET_CART_INFO_SUCCESS, payload: objCartInfo})
    }
  }
}

export default new ActionCart()