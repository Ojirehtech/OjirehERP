import {
  ADMIN_SIGNUP_START,
  ADMIN_SIGNUP_SUCCESS,
  ADMIN_SIGNUP_FAILED,
  ADMIN_SIGNIN_START,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNIN_FAILED,
} from "../actions/action_admin";

const initialState = {
  admin: {},
  loading: false,
  success: false,
  error: ""
}

const adminReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case ADMIN_SIGNUP_START:
      return {
        ...state,
        loading: true
      }
    case ADMIN_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        admin: action.data,
      }
    case ADMIN_SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case ADMIN_SIGNIN_START:
      return {
        ...state,
        loading: true
      }
    case ADMIN_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        admin: action.data,
      }
    case ADMIN_SIGNIN_FAILED:
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

export default adminReducer;