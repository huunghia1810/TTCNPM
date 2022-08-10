import _ from 'lodash'
import moment from 'moment'

import * as constantIdentity from '../constants/Identity'

import feathersClient from './../feathersClient'

//init info
const IDENTITY_KEY = 'IDENTITY_KEY'
const ACTIONS = {
  GENERATE_KEY: 'GENERATE_KEY',
  PARSE_KEY: 'PARSE_KEY',
}

class ActionIdentity {

  generateIdentity() {
    return dispatch => {
      let identityKey = localStorage.getItem(IDENTITY_KEY)
      //check exist identity key
      if(_.isNil(identityKey)) {
        const slotNum = this._generateSlotNumber()

        dispatch({type: constantIdentity.IDENTITY_GENERATE_KEY_PROCESSING})

        feathersClient.service('identity').create({
          slotNumber: slotNum,
          action: ACTIONS.GENERATE_KEY,
        }).then(response => {
          //set localStorage
          localStorage.setItem(IDENTITY_KEY, response)

          dispatch({type: constantIdentity.IDENTITY_GENERATE_KEY_SUCCESS, payload: response})
        }).catch(error => {
          dispatch({type: constantIdentity.IDENTITY_GENERATE_KEY_FAIL, payload: error.message})
        })
      } else { //identityKey existed in localStorage
        dispatch({type: constantIdentity.IDENTITY_GENERATE_KEY_SUCCESS, payload: identityKey})
      }
    }
  }

  getIdentityInfo(identityKey) {
    return dispatch => {
      dispatch({type: constantIdentity.IDENTITY_PARSE_KEY_PROCESSING})

      feathersClient.service('identity').create({
        strKey: identityKey,
        action: ACTIONS.PARSE_KEY,
      }).then(response => {
        console.log('identityInfo: ', response)
        dispatch({type: constantIdentity.IDENTITY_PARSE_KEY_SUCCESS, payload: response})
      }).catch(error => {
        dispatch({type: constantIdentity.IDENTITY_PARSE_KEY_FAIL, payload: error.message})
      })
    }
  }

  /*-----------------------------private functions-------------------------------*/
  /*-----------------------------private functions-------------------------------*/
  _generateSlotNumber() {
    return this._randomNumberInRange()
  }

  _randomNumberInRange(min = 1, max = 6) {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString()
  }
}

export default new ActionIdentity()