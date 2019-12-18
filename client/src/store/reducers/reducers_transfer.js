import {
  MAKE_TRANSFER_START,
MAKE_TRANSFER_SUCCESS,
MAKE_TRANSFER_FAILED,
GET_ALL_START,
GET_ALL_SUCCESS,
GET_ALL_FAILED,
APPROVE_TRANSFER_REQUEST_START,
APPROVE_TRANSFER_REQUEST_SUCCESS,
APPROVE_TRANSFER_REQUEST_FAILED,
} from "../actions/action_transfer";

const initialState = {
  transfer: [],
  loading: false,
  success: false,
  error: "",
}

const transferReducers = ( state = initialState, action ) => {
  switch ( action.type ) {
    case MAKE_TRANSFER_START:
      return {
        ...state,
        loading: true,
      }
    case MAKE_TRANSFER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transfer: state.transfer.concat(action.data),
      }
    case MAKE_TRANSFER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case GET_ALL_START:
      return {
        ...state,
        loading: true,
      }
    case GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transfer: action.data,
      }
    case GET_ALL_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case APPROVE_TRANSFER_REQUEST_START:
      return {
        ...state,
        loading: true,
       
      }
    case APPROVE_TRANSFER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        transfer: action.data,
      }
    case APPROVE_TRANSFER_REQUEST_FAILED:
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

export default transferReducers