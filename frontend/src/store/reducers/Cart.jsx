import * as  constantCart from '../../constants/Cart'

const initialState = {
  fetching: false,
  info: {},
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case  constantCart.CART_SET_CART_INFO_SUCCESS:
      return {
        ...state,
        fetching: false,
        info: action.payload,
        error: null,
      }

    default:
      return state
  }
}