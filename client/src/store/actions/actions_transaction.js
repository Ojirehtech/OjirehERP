import { isAuthenticated } from "../../helper/authenticate";

export const FUND_TRANSFER_START = "FUND_TRANSFER_START";
export const FUND_TRANSFER_SUCCESS = "FUND_TRANSFER_SUCCESS";
export const FUND_TRANSFER_FAILED = "FUND_TRANSFER_FAILED";
export const WITHDRAWAL_REQUEST_START = "WITHDRAWAL_REQUEST_START";
export const WITHDRAWAL_REQUEST_SUCCESS = "WITHDRAWAL_REQUEST_SUCCESS";
export const WITHDRAWAL_REQUEST_FAILED = "WITHDRAWAL_REQUEST_FAILED";
export const APPROVE_REQUEST_START = "APPROVE_REQUEST_START";
export const APPROVE_REQUEST_SUCCESS = "APPROVE_REQUEST_SUCCESS";
export const APPROVE_REQUEST_FAILED = "APPROVE_REQUEST_FAILED";

const BASE_URL = "http://localhost:3030/api/v1";

export const fundTransferStart = () => {
  return {
    type: FUND_TRANSFER_START
  }
}

export const fundTransferSuccess = ( data ) => {
  return {
    type: FUND_TRANSFER_SUCCESS,
    data
  }
}

export const fundTransferFailed = ( error ) => {
  return {
    type: FUND_TRANSFER_FAILED,
    error
  }
}

export const fundTransfer = ( data ) => {
  return dispatch => {
    dispatch( fundTransferStart() );
    fetch( `${ BASE_URL }/request/transfer`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( fundTransferFailed( resp.error ) );
          return;
        }
        dispatch( fundTransferSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( fundTransferFailed( "Network Error. Try again" ) );
      } );
  }
}

/**
 * Handles withdrawal requests
 */
export const withdrawalRequestStart = () => {
  return {
    type: WITHDRAWAL_REQUEST_START
  }
}

export const withdrawalRequestSuccess = ( data ) => {
  return {
    type: WITHDRAWAL_REQUEST_SUCCESS,
    data
  }
}

export const withdrawalRequestFailed = ( error ) => {
  return {
    type: WITHDRAWAL_REQUEST_FAILED,
    error
  }
}

export const withdrawalRequest = ( data ) => {
  return dispatch => {
    dispatch( withdrawalRequestStart() );
    fetch( `${ BASE_URL }/request`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( withdrawalRequestFailed( resp.error ) );
          return;
        }
        dispatch( withdrawalRequestSuccess( resp ) )
      } )
      .catch( err => {
        dispatch( withdrawalRequestFailed( "Request could not be completed. Try again" ) )
      } );
  }
}

/**
 * Handles requests approval
 */
export const approveRequestStart = () => {
  return {
    type: APPROVE_REQUEST_START
  }
}

export const approveRequestSuccess = ( data ) => {
  return {
    type: APPROVE_REQUEST_SUCCESS,
    data
  }
}

export const approveRequestFailed = ( error ) => {
  return {
    type: APPROVE_REQUEST_FAILED,
    error
  }
}

export const approveRequest = ( data ) => {
  return dispatch => {
    dispatch( approveRequestStart() );
    fetch( `${ BASE_URL }/`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( approveRequestFailed( resp.error ) );
          return;
        }
        dispatch( approveRequestSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( approveRequestFailed( err.message ) );
      } );
  }
}