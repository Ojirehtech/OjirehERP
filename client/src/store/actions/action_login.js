import Auth from "../../helper/Auth";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const SEND_OTP_START = "SEND_OTP_START";
export const SEND_OTP_SUCCESS = "SEND_OTP_SUCCESS";
export const SEND_OTP_FAILED = "SEND_OTP_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Action types for agent login
 */

export const loginStart = () => {
   return {
     type: LOGIN_START
   }
}

export const loginSuccess = ( data ) => {
  return {
    type: LOGIN_SUCCESS,
    data
  }
}

export const loginFailed = ( error ) => {
  return {
    type: LOGIN_FAILED,
    error
  }
}

/**
 * Action creator for agents login
 */

export const onLogin = ( data ) => {
  return dispatch => {
    dispatch( loginStart() );
    fetch( `${ BASE_URL }/login`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify( data )
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( loginFailed( resp.error ) );
          return;
        }
        Auth.authenticateUser( JSON.stringify(resp ));
        dispatch( loginSuccess( resp ) )
      } )
      .catch( err => {
        dispatch( loginFailed( `Request failed to complete. Check your network and try again.` ) );
      } );
   }
}

/**
 * Action  types for otp messages
 */
export const sendOTPStart = () => {
  return {
    type: SEND_OTP_START
  }
}

export const sendOTPSuccess = ( data ) => {
  return {
    type: SEND_OTP_SUCCESS,
    data
  }
}

export const sendOTPFailed = ( error ) => {
  return {
    type: SEND_OTP_FAILED,
    error
  }
}

export const sendOTP = ( userId ) => {
  console.log("inside send otp")
  return dispatch => {
    dispatch( sendOTPStart() );
    fetch( `${ BASE_URL }/user/otp/${ userId }`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json"
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        console.log(resp, "response from action ")
        if ( resp.error ) {
          dispatch( sendOTPFailed( resp.error ) );
          return;
        }
        dispatch( sendOTPSuccess(resp) );
      } )
      .catch( err => {
        dispatch( sendOTPFailed( err.message ) );
      } );
  }
}
 
/**
 * Handles account logout
 */
export const logoutStart = () => {
  return {
    type: LOGIN_START
  }
}

export const logoutSuccess = ( data ) => {
  return {
    type: LOGOUT_SUCCESS,
    data
  }
}

export const logoutFailed = ( error ) => {
  return {
    type: LOGOUT_FAILED,
    error
  }
}

export const logout = () => {
  return dispatch => {
    dispatch( logoutStart() );
    fetch( `${ BASE_URL }/signout`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( loginSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( logoutFailed( err.message ) );
      } );
  }
}