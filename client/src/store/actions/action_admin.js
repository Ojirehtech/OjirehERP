import Auth from "../../helper/Auth"
export const ADMIN_SIGNUP_START = "ADMIN_SIGNUP_START";
export const ADMIN_SIGNUP_SUCCESS = "ADMIN_SIGNUP_SUCCESS";
export const ADMIN_SIGNUP_FAILED = "ADMIN_SIGNUP_FAILED";
export const ADMIN_SIGNIN_START = "ADMIN_SIGNIN_START";
export const ADMIN_SIGNIN_SUCCESS = "ADMIN_SIGNIN_SUCCESS";
export const ADMIN_SIGNIN_FAILED = "ADMIN_SIGNIN_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

export const adminSignupStart = () => {
  return {
    type: ADMIN_SIGNUP_START
  }
}

export const adminSignupSuccess = ( data ) => {
  return {
    type: ADMIN_SIGNUP_SUCCESS,
    data
  }
}

export const adminSignupFailed = ( error ) => {
  return {
    type: ADMIN_SIGNUP_FAILED,
    error
  }
}

/**
 * Action creator for agent registration
 * @param {data} data of the person registering
 */
export const adminSignup = ( data ) => {
  return dispatch => {
    dispatch( adminSignupStart() );
    fetch( `${ BASE_URL }/admin/signup`, {
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
          dispatch( adminSignupFailed( resp.error ) );
          return;
        }
        Auth.authenticateUser( JSON.stringify( resp ) );
        dispatch( adminSignupSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( adminSignupFailed( `Sorry we cannot process your request. Check your network and try again` ) )
      } );
  }
}


export const adminSigninStart = () => {
  return {
    type: ADMIN_SIGNUP_START
  }
}

export const adminSigninSuccess = ( data ) => {
  return {
    type: ADMIN_SIGNUP_SUCCESS,
    data
  }
}

export const adminSigninFailed = ( error ) => {
  return {
    type: ADMIN_SIGNUP_FAILED,
    error
  }
}

/**
 * Action creator for agent registration
 * @param {data} data of the person registering
 */
export const adminSignin = ( data ) => {
  return dispatch => {
    dispatch( adminSigninStart() );
    fetch( `${ BASE_URL }/admin/signin`, {
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
          dispatch( adminSigninFailed( resp.error ) );
          return;
        }
        Auth.authenticateUser( JSON.stringify( resp ) );
        dispatch( adminSigninSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( adminSigninFailed( `Sorry we cannot process your request. Check your network and try again` ) )
      } );
  }
}