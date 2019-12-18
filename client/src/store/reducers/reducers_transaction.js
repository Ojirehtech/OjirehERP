import {
  WITHDRAWAL_REQUEST_START,
  WITHDRAWAL_REQUEST_SUCCESS,
  WITHDRAWAL_REQUEST_FAILED,
  APPROVE_REQUEST_START,
  APPROVE_REQUEST_SUCCESS,
  APPROVE_REQUEST_FAILED,
  GET_REQUEST_START,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_FAILED,
  FETCH_REQUEST_START,
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_FAILED,
} from "../actions/actions_transaction";

const initialState = {
  transaction: {},
  requests: [],
  withdraw: [],
  loading: false,
  success: false,
  withdrawSuccess: false,
  request: false,
  requestLoading: false,
  error: ""
}

const transactionReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case WITHDRAWAL_REQUEST_START:
      return {
        ...state,
        loading: true
      }
    case WITHDRAWAL_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        withdrawSuccess: true,
        withdraw: action.data,
      }
    case WITHDRAWAL_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        withdrawSuccess: false,
        error: action.error
      }
    case APPROVE_REQUEST_START:
      return {
        ...state,
        loading: true
      }
    case APPROVE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transaction: action.data,
      }
    case APPROVE_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_REQUEST_START:
      return {
        ...state,
        requestLoading: true
      }
    case GET_REQUEST_SUCCESS:
      return {
        ...state,
        requestLoading: false,
        request: true,
        requests: action.data
      }
    case GET_REQUEST_FAILED:
      return {
        ...state,
        requestLoading: false,
        request: false,
        error: action.error
      }
    case FETCH_REQUEST_START:
      return {
        ...state,
        requestLoading: true,
      }
    case FETCH_REQUEST_SUCCESS:
      return {
        ...state,
        requestLoading: false,
        request: true,
        requests: action.data,
      }
    case FETCH_REQUEST_FAILED:
      return {
        ...state,
        requestLoading: false,
        request: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default transactionReducer;