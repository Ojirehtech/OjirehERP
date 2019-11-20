import {
  VERIFY_NUMBER_START,
  VERIFY_NUMBER_STUCCESS,
  VERIFY_NUMBER_FAILED,
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILED
 } from "../actions/action_loan";

const initialState = {
  loan: {},
  loading: false,
  success: false,
  error: ""
}

const loanReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case VERIFY_NUMBER_START:
      return {
        ...state,
        loading: true
      }
    case VERIFY_NUMBER_STUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        loan: action.data,
      }
    case VERIFY_NUMBER_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case VERIFY_OTP_START:
      return {
        ...state,
        loading: true
      }
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        loan: action.data
      }
    case VERIFY_OTP_FAILED:
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

export default loanReducer;
