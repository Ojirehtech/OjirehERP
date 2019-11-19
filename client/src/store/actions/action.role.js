import { isAuthenticated } from "../../helper/authenticate";
import { getUser } from "./action_user";

export const ROLE_START = "ROLE_START";
export const ROLE_SUCCESS = "ROLE_SUCCESS";
export const ROLE_FAILED = "ROLE_FAILED";

export const roleStart = () => {
  return {
    type: ROLE_START
  }
}

export const roleSuccess = ( data ) => {
  return {
    type: ROLE_SUCCESS,
    data
  }
}

export const roleFailed = ( error ) => {
  return {
    type: ROLE_FAILED,
    error
  }
}

export const assignRole = (role, userId) => {
  const token = isAuthenticated().token;
  const adminId = isAuthenticated().user._id;
  return dispatch => {
    dispatch( roleStart() );
    fetch( `${ process.env.REACT_APP_API_URL }/role/${userId}/${adminId}/${role}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( roleFailed( resp.error ) );
          return;
        }
        dispatch( roleSuccess( resp ) );
      } )
      .then( () => {
        dispatch( getUser( userId ) );
      })
      .catch( err => {
        dispatch( roleFailed( err.message ) );
      } );
  }
}