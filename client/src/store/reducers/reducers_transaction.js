import {
  FUND_TRANSFER_START,
  FUND_TRANSFER_SUCCESS,
  FUND_TRANSFER_FAILED,
  WITHDRAWAL_REQUEST_START,
  WITHDRAWAL_REQUEST_SUCCESS,
  WITHDRAWAL_REQUEST_FAILED,
  APPROVE_REQUEST_START,
  APPROVE_REQUEST_SUCCESS,
  APPROVE_REQUEST_FAILED,
  GET_TRANSFERS_START,
  GET_TRANSFERS_SUCCESS,
  GET_TRANSFERS_FAILED,
  FINALIZE_TRANSFER_START,
  FINALIZE_TRANSFER_SUCCESS,
  FINALIZE_TRANSFER_FAILED,
} from "../actions/actions_transaction";

const initialState = {
  transaction: {},
  loading: false,
  success: false,
  error: ""
}

const transactionReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case FUND_TRANSFER_START:
      return {
        ...state,
        loading: true
      }
    case FUND_TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transaction: action.data,
      }
    case FUND_TRANSFER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case WITHDRAWAL_REQUEST_START:
      return {
        ...state,
        loading: true
      }
    case WITHDRAWAL_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transaction: action.data,
      }
    case WITHDRAWAL_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
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
    case GET_TRANSFERS_START:
      return {
        ...state,
        loading: true
      }
    case GET_TRANSFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transaction: action.data
      }
    case GET_TRANSFERS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case FINALIZE_TRANSFER_START:
      return {
        ...state,
        loading: true,
        
      }
    case FINALIZE_TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transaction: action.data,
      }
    case FINALIZE_TRANSFER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default transactionReducer;