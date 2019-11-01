import { isAuthenticated } from "../../helper/authenticate";
export const EDIT_START = "EDIT_START";
export const EDIT_SUCCESS = "EDIT_SUCCESS";
export const EDIT_FAILED = "EDIT_FAILED";

const BASE_URL = "http://localhost:3030/api/v1";

/**
 * Edit action type for agent profile update
 */

export const editStart = () => {
  return {
    type: EDIT_START
  }
}

export const editSuccess = ( data ) => {
  return {
    type: EDIT_SUCCESS,
    data
  }
}

export const editFailed = ( error ) => {
  return {
    type: EDIT_FAILED,
    error
  }
}

/**
 * Action creator for agent profile update
 * @param {data} data of the user to be edited
 */
export const onEdit = ( data ) => {
  const userId = isAuthenticated().user ? isAuthenticated().user._id : null;
  return dispatch => {
    dispatch(editStart())
    fetch( `${ BASE_URL }/user/update/${userId}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify(data)
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( editFailed( resp.error ) );
          return;
        }
        dispatch( editSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( editFailed( "Network Error. Please check your internet connection and try again" ) );
      } );
  }
}