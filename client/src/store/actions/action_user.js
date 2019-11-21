import { isAuthenticated } from "../../helper/authenticate";
export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const GET_USERS_START = "GET_USERS_START";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";

export const DELETE_USER_START = "DELETE_USER_START";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILED = "DELETE_USER_FAILED";

export const GET_BY_PARENTID_START = "GET_BY_PARENTID_START";
export const GET_BY_PARENTID_SUCCESS = "GET_BY_PARENTID_SUCCESS";
export const GET_BY_PARENTID_FAILED = "GET_BY_PARENTID_FAILED";

export const UPDATE_PARENTID_START = "UPDATE_PARENTID_START";
export const UPDATE_PARENTID_SUCCESS = "UPDATE_PARENTID_SUCCESS";
export const UPDATE_PARENTID_FAILED = "UPDATE_PARENTID_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getUserStart = () => {
  return {
    type: GET_USER_START
  }
}

export const getUserSuccess = ( data ) => {
  return {
    type: GET_USER_SUCCESS,
    data
  }
}

export const getUserFailed = ( error ) => {
  return {
    type: GET_USER_FAILED,
    error
  }
}

export const getUser = () => {
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  return dispatch => {
    dispatch( getUserStart() );
    fetch( `${ BASE_URL }/user/${ userId }`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        console.log(resp, " user from response")
        if ( resp.error ) {
          dispatch( getUserFailed( resp.error ) );
          return;
        }
        dispatch( getUserSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( getUserFailed( "Some thing went wrong. Try again" ) );
      } );
  }
}

export const getUsersStart = () => {
  return {
    type: GET_USERS_START
  }
}

export const getUsersSuccess = ( data ) => {
  return {
    type: GET_USERS_SUCCESS, 
    data
  }
}

export const getUsersFailed = ( error ) => {
  return {
    type: GET_USERS_FAILED,
    error
  }
}

export const getUsers = () => {
  return dispatch => {
    dispatch( getUsersStart() );
    fetch( `${ BASE_URL }/users`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( getUsersFailed( resp.error ) );
          return;
        }
        dispatch( getUsersSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( getUsersFailed( "We could not process your request. Check your network and try again" ) )
      } );
  }
}

export const deleteUserStart = () => {
  return {
    type: DELETE_USER_START
  }
}

export const deleteUserSuccess = ( data ) => {
  return {
    type: DELETE_USER_SUCCESS,
    data
  }
}

export const delelteUserFailed = ( error ) => {
  return {
    type: DELETE_USER_FAILED,
    error
  }
}

export const deleteUser = ( agentId ) => {
  return dispatch => {
    dispatch( deleteUserStart() );
    fetch( `${ BASE_URL }`, {
      method: "DELETE",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( deleteUserSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( delelteUserFailed( "Request failed due to network error" ) );
      } );
  }
}


export const getByParentIdStart = () => {
  return {
    type: GET_BY_PARENTID_START
  }
}

export const getByParentIdSuccess = ( data ) => {
  return {
    type: GET_BY_PARENTID_SUCCESS,
    data
  }
}

export const getByParentIdFailed = ( error ) => {
  return {
    type: GET_BY_PARENTID_FAILED,
    error
  }
}

export const getByParentId = () => {
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch( getByParentIdStart() );
    fetch( `${ BASE_URL }/user/network/${ userId }`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/jsoon",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( getByParentIdFailed( resp.error ) );
          return;
        }
        dispatch( getByParentIdSuccess( resp ) )
      } )
      .catch( err => {
        dispatch( getByParentIdFailed( "Network Error" ) );
      } );
  }
}

export const updateParentIdStart = () => {
  return {
    type: UPDATE_PARENTID_START
  }
}

export const updateParentIdSuccess = ( data ) => {
  return {
    type: UPDATE_PARENTID_SUCCESS,
    data
  }
}

export const updateParentIdFailed = ( error ) => {
  return {
    type: UPDATE_PARENTID_FAILED,
    error
  }
}

export const updateParentId = () => {
  const refererPhone = isAuthenticated().user.refererPhone;
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;
  return dispatch => {
    dispatch( updateParentIdStart() );
    fetch( `${ BASE_URL }/user/parentId/${ userId }/${ refererPhone }`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( updateParentIdFailed( resp.error ) );
          return;
        }
        dispatch( updateParentIdSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( updateParentIdFailed( err.message ) );
      } );
  }
}