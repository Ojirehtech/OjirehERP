import {
  VERIFY_OTP_START,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILED,
  GENERATE_OTP_START,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAILED,
  LOAN_REQUEST_START,
  LOAN_REQUEST_SUCCESS,
  LOAN_REQUEST_FAILED,
  FETCH_ALL_LOAN_START,
  FETCH_ALL_LOAN_SUCCESS,
  FETCH_ALL_LOAN_FAILED,
  FETCH_LOAN_START,
  FETCH_LOAN_SUCCESS,
  FETCH_LOAN_FAILED,
  PAY_LOAN_START,
  PAY_LOAN_SUCCESS,
  PAY_LOAN_FAILED,
 } from "../actions/action_loan";

const initialState = {
  loan: {},
  otp: {},
  loading: false,
  success: false,
  requestLoading: false,
  requestSuccess: false,
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
    case LOAN_REQUEST_START:
      return {
        ...state,
        requestLoading: true
      }
    case LOAN_REQUEST_SUCCESS:
      return {
        ...state,
        requestLoading: false,
        requestSuccess: true,
        loan: state.loans.concat(action.data),
      }
    case LOAN_REQUEST_FAILED:
      return {
        ...state,
        requestLoading: false,
        requestSuccess: false,
        error: action.error
      }
    case FETCH_ALL_LOAN_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_ALL_LOAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        loans: action.data,
      }
    case FETCH_ALL_LOAN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case FETCH_LOAN_START:
      return {
        ...state,
        loading: true
      }
    case FETCH_LOAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        loan: action.data,
      }
    case FETCH_LOAN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case PAY_LOAN_START:
      return {
        ...state,
        loading: true
      }
    case PAY_LOAN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        loan: action.data,
      }
    case PAY_LOAN_FAILED:
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
