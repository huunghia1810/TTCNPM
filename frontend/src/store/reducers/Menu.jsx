import * as  constantMenu from '../../constants/Menu'

const initialState = {
  fetching: false,
  configs: {},
  menuItemSelected: {},
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case  constantMenu.MENU_GET_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        configs: {},
        error: null,
      }
    case  constantMenu.MENU_GET_DATA_SUCCESS:
      let { configs } = action.payload
      if(typeof configs === 'string') {
        configs = JSON.parse(configs)
      }
      return {
        ...state,
        fetching: false,
        configs: configs,
        error: null,
      }
    case  constantMenu.MENU_GET_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        configs: {},
        error: action.payload,
      }
    case  constantMenu.MENU_PICK_ITEM_SUCCESS:
      return {
        ...state,
        menuItemSelected: action.payload,
      }

    default:
      return state
  }
}