import { isAuthenticated } from "../../helper/authenticate";

export const VERIFY_NUMBER_START = "VERIFY_NUMBER_START";
export const VERIFY_NUMBER_STUCCESS = "VERIFY_NUMBER_SUCCESS";
export const VERIFY_NUMBER_FAILED = "VERIFY_NUMBER_FAILED";

export const VERIFY_OTP_START = "VERIFY_OTP_START";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILED = "VERIFY_OTP_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

export const verifyNumberStart = () => {
  return {
    type: VERIFY_NUMBER_START
  }
}

export const verifyNumberSuccess = ( data ) => {
  return {
    type: VERIFY_NUMBER_STUCCESS,
    data
  }
}

export const verifyNumberFailed = ( error ) => {
  return {
    type: VERIFY_NUMBER_FAILED,
    error
  }
}

export const verifyNumber = ( data ) => {
  const token = isAuthenticated().token;
  return dispatch => {
    dispatch( verifyNumberStart() );
    fetch( `${ BASE_URL }/user/otp/${ data }`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( verifyNumberFailed( resp.error ) );
          return;
        }
        dispatch( verifyNumberSuccess() );
      } )
      .catch( err => {
        dispatch( verifyNumberFailed( err.message ) );
      } );
  }
}

export const verifyOtpStart = () => {
  return {
    type: VERIFY_OTP_START
  }
}

export const verifyOtpSuccess = ( data ) => {
  return {
    type: VERIFY_OTP_SUCCESS,
    data
  }
}

export const verifyOtpFailed = ( error ) => {
  return {
    type: VERIFY_OTP_FAILED,
    error
  }
}

export const verifyOtp = ( data ) => {
  return dispatch => {
    dispatch( verifyOtpStart() );
    fetch( `${ BASE_URL }/user/verifyotp/${ data }`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( verifyOtpFailed( resp.error ) );
          return;
        }
        dispatch( verifyOtpSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( verifyOtpFailed( err.message ) );
      } );
  }
}