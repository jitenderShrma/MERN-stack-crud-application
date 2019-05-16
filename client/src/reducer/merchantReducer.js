import {
  GET_MERCHANTS,
  GET_MERCHANT,
  DELETE_MERCHANT,
  MERCHANT_LOADING
} from '../actions/types';
const initialState = {
  merchant: {},
  merchants: [],
  loading: false
}

const authReducer = function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    case GET_MERCHANTS: return {
      ...state,
      loading: false,
      merchants: action.payload
    }
    case MERCHANT_LOADING: return {
      ...state,
      loading: true
    }
    case DELETE_MERCHANT: {
      return {
        ...state,
        merchants: state.merchants.filter(each => each._id !== action.payload)
      }
    }
    case GET_MERCHANT: {
      return {
        ...state,
        loading: false,
        merchant: action.payload
      }
    }
  }
}
export default authReducer;