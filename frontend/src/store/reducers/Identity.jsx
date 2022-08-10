import * as  constantIdentity from '../../constants/Identity'

const initialState = {
  processing: false,
  identityKey: null,
  data: {},
  error: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case  constantIdentity.IDENTITY_GENERATE_KEY_PROCESSING:
      return {
        ...state,
        processing: true,
        identityKey: null,
        error: null,
      }
    case  constantIdentity.IDENTITY_GENERATE_KEY_SUCCESS:
      return {
        ...state,
        processing: false,
        identityKey: action.payload,
        error: null,
      }
    case  constantIdentity.IDENTITY_GENERATE_KEY_FAIL:
      return {
        ...state,
        processing: false,
        identityKey: null,
        error: action.payload,
      }

    case  constantIdentity.IDENTITY_PARSE_KEY_PROCESSING:
      return {
        ...state,
        processing: true,
        data: {},
        error: null,
      }
    case  constantIdentity.IDENTITY_PARSE_KEY_SUCCESS:
      return {
        ...state,
        processing: false,
        data: action.payload,
        error: null,
      }
    case  constantIdentity.IDENTITY_PARSE_KEY_FAIL:
      return {
        ...state,
        processing: false,
        data: {},
        error: action.payload,
      }

    default:
      return state
  }
}