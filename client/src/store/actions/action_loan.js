import { isAuthenticated } from "../../helper/authenticate";


export const VERIFY_OTP_START = "VERIFY_OTP_START";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILED = "VERIFY_OTP_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

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
      method: "POST",
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