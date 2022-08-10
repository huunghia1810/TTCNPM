import * as  constantCart from '../../constants/Cart'

const initialState = {
  fetching: false,
  configs: {},
  cartItemSelected: {},
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case  constantCart.CART_GET_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        configs: {},
        error: null,
      }
    case  constantCart.CART_GET_DATA_SUCCESS:
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
    case  constantCart.CART_GET_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        configs: {},
        error: action.payload,
      }

    default:
      return state
  }
}