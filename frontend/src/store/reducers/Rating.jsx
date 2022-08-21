import * as constantRating from '../../constants/Rating'

const initialState = {
  fetching: false,
  ratingInfo: {},
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case constantRating.RATING_ADD_DATA_PROCESSING:
      return {
        ...state,
        fetching: true,
        ratingInfo: {},
        error: null,
      }
    case constantRating.RATING_ADD_DATA_SUCCESS:
      return {
        ...state,
        fetching: false,
        ratingInfo: action.payload,
        error: null,
      }
    case constantRating.RATING_ADD_DATA_FAIL:
      return {
        ...state,
        fetching: false,
        ratingInfo: {},
        error: action.payload,
      }

    default:
      return state
  }
}