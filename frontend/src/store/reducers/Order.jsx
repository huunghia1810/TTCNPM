import * as constantOrder from '../../constants/Order'

const initialState = {
  fetching: false,
  orderInfo: {},

  //for management
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
        orderInfo: {},
        error: null,
      }
    case constantOrder.ORDER_ADD_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        orderInfo: action.payload,
        error: null,
      }
    case constantOrder.ORDER_ADD_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        orderInfo: {},
        error: action.payload,
      }


    case constantOrder.ORDER_GET_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        listOrders: [],
        total: 0,
        limit: 0,
        skip: 0,
        error: null,
      }
    case constantOrder.ORDER_GET_DATA_SUCCESS:
      var { total, limit, skip, data } = action.payload
      return {
        ...state,
        fetching: false,
        listOrders: data,
        totalUnread: total,
        limitUnread: limit,
        skipUnread: skip,
        error: null,
      }
    case constantOrder.ORDER_GET_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        listOrders: [],
        total: 0,
        limit: 0,
        skip: 0,
        error: action.payload,
      }

    case constantOrder.ORDER_UPDATE_SUCCESS:
      var { total, limit, skip, data } = action.payload
      return {
        ...state,
        fetching: false,
        listOrders: data,
        totalUnread: total,
        limitUnread: limit,
        skipUnread: skip,
        error: null,
      }
    default:
      return state
  }
}