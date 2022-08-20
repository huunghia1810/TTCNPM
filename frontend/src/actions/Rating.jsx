import _ from 'lodash'

import feathersClient from './../feathersClient'

//import constants
import * as constantRating from '../constants/Rating'

//init info

class ActionRating {

  sendFeedback(data, cb = false) {
    return dispatch => {
      dispatch({type: constantRating.RATING_ADD_DATA_PROCESSING})

      feathersClient.service('ratings').create(data).then(res => {
        dispatch({type: constantRating.RATING_ADD_DATA_SUCCESS, payload: res})
        if(typeof cb == 'function') {
          cb(true, res)
        }
      }).catch(error => {
        dispatch({type: constantRating.RATING_ADD_DATA_FAIL, payload: error})
        cb(false, error)
      })
    }
  }
}

export default new ActionRating()