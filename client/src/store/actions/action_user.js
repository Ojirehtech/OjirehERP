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

export const UPDATE_USER_START = "UPDATE_USER_START";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const AWARD_BONUS_START = "AWARD_BONUS_START";
export const AWARD_BONUS_SUCCESS = "AWARD_BONUS_SUCCESS";
export const AWARD_BONUS_FAILED = "AWARD_BONUS_FAILED";

export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILED = "SEARCH_FAILED";

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

export const getUser = (userId) => {
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
        dispatch( getUsersFailed( "Request failed. Check your network and try again" ) )
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

export const deleteUser = ( userId ) => {
  return dispatch => {
    dispatch( deleteUserStart() );
    fetch( `${ BASE_URL }/user/delete/${userId}`, {
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

export const updateUserStart = () => {
  return {
    type: UPDATE_USER_START
  }
}

export const updateUserSuccess = (data) => {
  return {
    type: UPDATE_USER_SUCCESS,
    data
  }
}

export const updateUserFailed = (error) => {
  return {
    type: UPDATE_USER_FAILED,
    error
  }
}

export const updatedUser = ( data ) => {
  const userId = isAuthenticated().user._id;

  return dispatch => {
    dispatch( updateUserStart() );
    fetch( `${ BASE_URL }/user/${userId}`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify( data )
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( updateUserFailed( resp.error ) );
          return;
        }
        dispatch( updateUserSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( updateUserFailed( "Network Error. Try again" ) );
      } );
  }
}

export const awardBonusStart = () => {
  return {
    type: AWARD_BONUS_START
  }
}

export const awardBonusSuccess = ( data ) => {
  return {
    type: AWARD_BONUS_SUCCESS,
    data
  }
}

export const awardBonusFailed = ( error ) => {
  return {
    type: AWARD_BONUS_FAILED,
    error
  }
}

export const awardBonus = () => {
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch( awardBonusStart() );
    fetch( `${ BASE_URL }/user/bonus/${ userId }`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( awardBonusFailed( resp.error ) );
          return;
        }
        dispatch( awardBonusSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( awardBonusFailed( "Network Error. Please try again" ) );
      } );
  }
}

export const searchStart = () => {
  return {
    type: SEARCH_START
  }
}

export const searchSuccess = ( data ) => {
  return {
    type: SEARCH_SUCCESS,
    data
  }
}

export const searchFailed = ( error ) => {
  return {
    type: SEARCH_FAILED,
    error
  }
}

export const searchUser = ( searchTerm ) => {
  console.log(searchTerm, " action search term")
  return dispatch => {
    dispatch( searchStart() );
    fetch( `${ BASE_URL }/users/search?q=${ searchTerm }`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( searchSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( searchFailed( "Search failed. Check your network connection" ) );
      } );
  }
}