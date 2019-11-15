import Auth from "../../helper/Auth"
export const REGISTRATION_START = "REGISTRATION_START";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

const BASE_URL = "http://localhost:3030/api/v1/signup";

/**
 * Action types for agent registration
 */
export const registrationStart = () => {
  return {
    type: REGISTRATION_START
  }
}

export const registrationSuccess = ( data ) => {
  return {
    type: REGISTRATION_SUCCESS,
    data
  }
}

export const registrationFailed = ( error ) => {
  return {
    type: REGISTRATION_FAILED,
    error
  }
}

/**
 * Action creator for agent registration
 * @param {data} data of the person registering
 */
export const register = ( data ) => {
  console.log(data, "this is data containing referer phone number")
  return dispatch => {
    dispatch( registrationStart() );
    fetch( `${ BASE_URL }`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( registrationFailed( resp.error ) );
          return;
        }
        Auth.authenticateUser( JSON.stringify( resp ) );
        dispatch( registrationSuccess( resp ) );
      } )
      .catch( err => {
      dispatch(registrationFailed(`Sorry we cannot process your request. Check your network and try again`))
    })
  }
}