import _ from 'lodash'

import * as constantMenu from '../constants/Menu'

import feathersClient from './../feathersClient'

class ActionMenu {
  getMenu() {
    return function (dispatch) {
      dispatch({type: constantMenu.MENU_GET_DATA_PROCESSING})

      feathersClient.service('menu').get(1)
        .then(response => {
          dispatch({type: constantMenu.MENU_GET_DATA_SUCCESS, payload: response})
        }).catch(error => {
        dispatch({type: constantMenu.MENU_GET_DATA_FAIL, payload: error.message})
      })
    }
  }
}

export default new ActionMenu()