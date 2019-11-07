import { 
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  SEND_OTP_START,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILED
} from "../actions/action_login";

const initialState = {
  agent: {},
  loading: false,
  success: false,
  otpLoading: false,
  otpSuccess: false,
  error: ""
}

const loginReducers = ( state = initialState, action ) => {
  switch ( action.type ) {
    case LOGIN_START:
      return {
        ...state,
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        agent: action.data
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case LOGOUT_START:
      return {
        ...state,
        loading: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        success: true,
      }
    case SEND_OTP_START:
      return {
        ...state,
        otpLoading: true,
      }
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        otpLoading: false,
        otpSuccess: true,
        agent: action.data,
      }
    case SEND_OTP_FAILED:
      return {
        ...state,
        otpLoading: false,
        otpSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default loginReducers;