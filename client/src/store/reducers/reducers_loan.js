import {
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILED,
  GENERATE_OTP_START,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAILED,
 } from "../actions/action_loan";

const initialState = {
  loan: {},
  otp: {},
  loading: false,
  success: false,
  error: ""
}

const loanReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case GENERATE_OTP_START:
      return {
        ...state,
        loading: true
      }
    case GENERATE_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        loan: action.data
      }
    case GENERATE_OTP_FAILED:
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
        otp: action.data
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
