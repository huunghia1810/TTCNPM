import * as constantOrder from '../../constants/Order'

const initialState = {
  fetching: false,
  listOrders: [],
  total: 0,
  limit: 0,
  skip: 0,
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case constantOrder.ORDER_ADD_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        listOrders: [],
        error: null,
      }
    case constantOrder.ORDER_ADD_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        listOrders: action.payload,
        error: null,
      }
    case constantOrder.ORDER_ADD_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        listOrders: [],
        error: action.payload,
      }

    default:
      return state
  }
}