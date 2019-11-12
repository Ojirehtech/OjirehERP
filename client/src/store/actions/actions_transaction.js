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

export const GET_TRANSFERS_START = "GET_TRANSFERS_START";
export const GET_TRANSFERS_SUCCESS = "GET_TRANSFERS_SUCCESS";
export const GET_TRANSFERS_FAILED = "GET_TRANSFERS_FAILED";
export const FINALIZE_TRANSFER_START = "FINALIZE_TRANSFER_START";
export const FINALIZE_TRANSFER_SUCCESS = "FINALIZE_TRANSFER_SUCCESS";
export const FINALIZE_TRANSFER_FAILED = "FINALIZE_TRANSFER_FAILED";

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
      },
      body: JSON.stringify(data)
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

/**
 * Gets all deposits
 */
export const getTransferStart = () => {
  return {
    type: GET_TRANSFERS_START
  }
}

export const getTransferSuccess = ( data ) => {
  return {
    type: GET_TRANSFERS_SUCCESS,
    data
  }
}

export const getTransferFailed = ( error ) => {
  return {
    type: GET_TRANSFERS_FAILED,
    error
  }
}

export const getTransfer = () => {
  return dispatch => {
    dispatch( getTransferStart() );
    fetch( `${ BASE_URL }/transfer`, {
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
          dispatch( getTransferFailed( resp.error ) );
          return;
        }
        dispatch( getTransferSuccess( resp ) )
      } )
      .catch( err => {
        dispatch( getTransferFailed( "Some thing went wrong. Try again" ) );
      } );
  }
}

export const finalizeTransferStart = () => {
  return {
    type: FINALIZE_TRANSFER_START
  }
}

export const finalizeTransferSuccess = (data) => {
  return {
    type: FINALIZE_TRANSFER_SUCCESS,
    data
  }
}

export const finalizeTransferFailed = (error) => {
  return {
    type: FINALIZE_TRANSFER_FAILED,
    error
  }
}

export const finalizeTransfer = ( transferId ) => {
  return dispatch => {
    dispatch( finalizeTransferStart() );
    fetch( `${ BASE_URL }/transfer/${ transferId }`, {
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
          dispatch( finalizeTransferFailed( resp.error ) );
          return;
        }
        dispatch( finalizeTransferSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( finalizeTransferFailed( "Could not complete request. Try again" ) );
      } );
  }
}