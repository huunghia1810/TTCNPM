const ORDER_ADD_DATA_PROCESSING = 'ORDER_ADD_DATA_PROCESSING'
const ORDER_ADD_DATA_SUCCESS = 'ORDER_ADD_DATA_SUCCESS'
const ORDER_ADD_DATA_FAIL = 'ORDER_ADD_DATA_FAIL'

const ORDER_GET_DATA_PROCESSING = 'ORDER_GET_DATA_PROCESSING'
const ORDER_GET_DATA_SUCCESS = 'ORDER_GET_DATA_SUCCESS'
const ORDER_GET_DATA_FAIL = 'ORDER_GET_DATA_FAIL'

const ORDER_UPDATE_PROCESSING = 'ORDER_UPDATE_PROCESSING'
const ORDER_UPDATE_SUCCESS = 'ORDER_UPDATE_SUCCESS'
const ORDER_UPDATE_FAIL = 'ORDER_UPDATE_FAIL'

const ORDER_SET_ORDER_INFO_SUCCESS = 'ORDER_SET_ORDER_INFO_SUCCESS'
const ORDER_STATUS = {
    DRAFT: 'DRAFT',
    NEW: 'NEW',
    PREPARING: 'PREPARING',
    SERVED: 'SERVED',
    DONE: 'DONE',
}

export {
    ORDER_ADD_DATA_PROCESSING,
    ORDER_ADD_DATA_SUCCESS,
    ORDER_ADD_DATA_FAIL,

    ORDER_GET_DATA_PROCESSING,
    ORDER_GET_DATA_SUCCESS,
    ORDER_GET_DATA_FAIL,

    ORDER_UPDATE_PROCESSING,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,

    ORDER_SET_ORDER_INFO_SUCCESS,
    ORDER_STATUS,
}
