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

  pickMenuItem(objMenuItem) {
    return function (dispatch) {
      dispatch({type: constantMenu.MENU_PICK_ITEM_SUCCESS, payload: objMenuItem})
    }
  }

  getCatByCatId(id, listCategories) {
    let res
    try {
      res = Object.keys(listCategories).length ? listCategories.find(cat => cat.category.id == id) : undefined
    } catch (e) {}
    return res
  }

  getMenuItemById(id, listCategories) {
    let res
    const catId = id.toString().substring(0, 2)
    const catInfo = this.getCatByCatId(catId, listCategories)
    if(catInfo != undefined) {
      const { items } = catInfo
      res = items.find(item => item.id == id)
      res.catInfo = catInfo
    }

    return res
  }
}

export default new ActionMenu()