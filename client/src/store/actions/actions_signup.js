import Auth from "../../helper/Auth"
export const REGISTRATION_START = "REGISTRATION_START";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

export const DATA_UPLOAD_START = "DATA_UPLOAD_START";
export const DATA_UPLOAD_SUCCESS = "DATA_UPLOAD_SUCCESS";
export const DATA_UPLOAD_FAILED = "DATA_UPLOAD_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

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
  return dispatch => {
    dispatch( registrationStart() );
    fetch( `${ BASE_URL }/signup`, {
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
          dispatch( registrationFailed( resp.error ) );
          return;
        }
        Auth.authenticateUser( JSON.stringify( resp ) );
        dispatch( registrationSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( registrationFailed( `Network error. Please try again` ) )
      } );
  }
}

export const dataUploadStart = () => {
  return {
    type: DATA_UPLOAD_START
  }
}

export const dataUploadSuccess = ( data ) => {
  return {
    type: DATA_UPLOAD_SUCCESS,
    data
  }
}

export const dataUploadFailed = ( error ) => {
  return {
    type: DATA_UPLOAD_FAILED,
    error
  }
}

export const dataUpload = ( data ) => {
  return dispatch => {
    dispatch( dataUploadStart() );
    fetch( `${ process.env.REACT_APP_API_URL }/users/data_upload`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify( data )
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( dataUploadFailed( resp.error ) );
          return;
        }
        dispatch( dataUploadSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( dataUploadFailed( "Data upload failed. Please try again" ) );
      } );
  }
}