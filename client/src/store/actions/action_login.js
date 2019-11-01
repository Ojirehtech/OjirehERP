import Auth from "../../helper/Auth";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

const BASE_URL = "http://localhost:3030/api/v1/login";

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
    fetch( `${ BASE_URL }`, {
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
        Auth.authenticateUser( resp );
        dispatch( loginSuccess( resp ) )
      } )
      .catch( err => {
        dispatch( loginFailed( `Request failed to complete. Check your network and try again.` ) );
      } );
   }
 }