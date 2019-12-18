import { isAuthenticated } from "../../helper/authenticate";

export const MAKE_TRANSFER_START = "MAKE_TRANSFER_START";
export const MAKE_TRANSFER_SUCCESS = "MAKE_TRANSFER_SUCCESS";
export const MAKE_TRANSFER_FAILED = "MAKE_TRNASFER_FAILED";
export const GET_ALL_START = "GET_ALL_START";
export const GET_ALL_SUCCESS = "GET_ALL_SUCCESS";
export const GET_ALL_FAILED = "GET_ALL_FAILED";
export const APPROVE_TRANSFER_REQUEST_START = "APPROVE_TRANSFER_REQUEST_START";
export const APPROVE_TRANSFER_REQUEST_SUCCESS = "APPROVE_TRANSGER_REQUEST_SUCCESS";
export const APPROVE_TRANSFER_REQUEST_FAILED = "APPROVE_TRANSFER_REQUEST_FAILED";

export const GET_TRANSFER_BY_USER_START = "GET_TRANSFER_BY_USER_START";
export const GET_TRANSFER_BY_USER_SUCCESS = "GET_TRANSFER_BY_USER_SUCCESS";
export const GET_TRANSFER_BY_USER_FAILED = "GET_TRANSFER_BY_USER_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

export const makeTransferStart = () => {
  return {
    type: MAKE_TRANSFER_START
  }
}

export const makeTransferSuccess = ( data ) => {
  return {
    type: MAKE_TRANSFER_SUCCESS,
    data
  }
}

export const makeTransferFailed = ( error ) => {
  return {
    type: MAKE_TRANSFER_FAILED,
    error
  }
}

export const makeTransfer = ( data ) => {
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch( makeTransferStart() );
    fetch( `${ BASE_URL }/transfer/${ userId }`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify( data )
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( makeTransferSuccess(resp) );
      } )
      .catch( err => {
        dispatch( makeTransferFailed( "Request failed. Check your network and try again." ) );
      } );
  }
}

/**
 * GET ALL TRANSFER REQUESTS FROM THE BACKEND APP
 */
export const getAllStart = () => {
  return {
    type: GET_ALL_START
  }
}

export const getAllSuccess = ( data ) => {
  return {
    type: GET_ALL_SUCCESS,
    data
  }
}

export const getAllFailed = ( error ) => {
  return {
    type: GET_ALL_FAILED,
    error
  }
}

export const getAllTransfer = () => {
  return dispatch => {
    dispatch( getAllStart() );
    fetch( `${ BASE_URL }/transfer/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( getAllSuccess(resp) );
      } )
      .catch( err => {
        dispatch( getAllFailed( "Request failed. Check your network and try again" ) );
      } );
  }
}

/**
 * APPROVE A SINGLE TRANSFER REQUEST
 */

export const approveTransferStart = () => {
  return {
    type: APPROVE_TRANSFER_REQUEST_START
  }
}

export const approveTransferSuccess = ( data ) => {
  return {
    type: APPROVE_TRANSFER_REQUEST_SUCCESS,
    data
  }
}

export const approveTransferFailed = ( error ) => {
  return {
    type: APPROVE_TRANSFER_REQUEST_FAILED,
    error
  }
}

export const approveTransfer = (requestId, data) => {
  const role = isAuthenticated().user.role;
  return dispatch => {
    dispatch( approveTransferStart() );
    fetch( `${ BASE_URL }/transfer/${ requestId }/${ role }`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify( data )
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( approveTransferSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( approveTransferFailed( "Request failed. Check your network and try again" ) );
      } );
  }
}

/**
 * GET ALL TRANSFERS MADE BY A USER
 */
export const getTransferByUserStart = () => {
  return {
    type: GET_TRANSFER_BY_USER_START
  }
}

export const getTransferByUserSuccess = ( data ) => {
  return {
    type: GET_TRANSFER_BY_USER_SUCCESS,
    data
  }
}

export const getTransferByUserFailed = ( error ) => {
  return {
    type: GET_TRANSFER_BY_USER_FAILED,
    error
  }
}

export const getTransferByUser = () => {
  console.log("hey from get transfer by user")
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatchEvent( getTransferByUserStart() );
    fetch( `${ BASE_URL }/transfer/all/${ userId }`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ACCEPT: "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        dispatch( getTransferByUserSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( getTransferByUserFailed( "Request faild due to network failure" ) );
      } );
  }
}