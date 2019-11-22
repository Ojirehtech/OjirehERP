import { isAuthenticated } from "../../helper/authenticate";


export const GENERATE_OTP_START = "GENERATE_OTP_START";
export const GENERATE_OTP_SUCCESS = "GENERATE_OTP_SUCCESS";
export const GENERATE_OTP_FAILED = "GENERATE_OTP_FAILED";

export const VERIFY_OTP_START = "VERIFY_OTP_START";
export const VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS";
export const VERIFY_OTP_FAILED = "VERIFY_OTP_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

export const generateOtpStart = () => {
  return {
    type: GENERATE_OTP_START
  }
}

export const generateOtpSuccess = ( data ) => {
  return {
    type: GENERATE_OTP_SUCCESS,
    data
  }
}

export const generateOtpFailed = ( error ) => {
  return {
    type: GENERATE_OTP_FAILED,
    error
  }
}

export const generateOtp = ( data ) => {
  const userId = isAuthenticated().user._id;
  console.log("hello from generate otp")
  return dispatch => {
    dispatch( generateOtpStart() );
    fetch( `${ BASE_URL }/user/generate/${userId}/${ data }`, {
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
          dispatch( generateOtpFailed( resp.error ) );
          return;
        }
        dispatch( generateOtpSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( generateOtpFailed( err.message ) );
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