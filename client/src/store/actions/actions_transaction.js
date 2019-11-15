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

export const GET_REQUEST_START = "GET_REQUEST_START";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST_FAILED = "GET_REQUEST_FAILED";

export const FETCH_REQUEST_START = "FETCH_REQUEST_START";
export const FETCH_REQUEST_SUCCESS = "FETCH_REQUEST_SUCCESS";
export const FETCH_REQUEST_FAILED = "FETCH_REQUEST_FAILED";

export const GET_TRANSFERS_START = "GET_TRANSFERS_START";
export const GET_TRANSFERS_SUCCESS = "GET_TRANSFERS_SUCCESS";
export const GET_TRANSFERS_FAILED = "GET_TRANSFERS_FAILED";

export const FINALIZE_TRANSFER_START = "FINALIZE_TRANSFER_START";
export const FINALIZE_TRANSFER_SUCCESS = "FINALIZE_TRANSFER_SUCCESS";
export const FINALIZE_TRANSFER_FAILED = "FINALIZE_TRANSFER_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

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
  const role = isAuthenticated().user.role;
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch( withdrawalRequestStart() );
    fetch( `${ BASE_URL }/request/${userId}/${role}`, {
      method: "POST",
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

export const approveRequest = (data, agentId, requestId ) => {
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch( approveRequestStart() );
    fetch( `${ BASE_URL }/request/approval/${userId}/${agentId}/${requestId}`, {
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
          dispatch( approveRequestFailed( resp.error ) );
          return;
        }
        dispatch( approveRequestSuccess( resp ) );
      } )
      .then( () => {
        dispatch( getRequest() );
      })
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
      .then( () => {
        dispatch( getTransfer() );
      })
      .catch( err => {
        dispatch( finalizeTransferFailed( "Could not complete request. Try again" ) );
      } );
  }
}

/**
 * Get all requests
 */
export const getRequestStart = () => {
  return {
    type: GET_REQUEST_START
  }
}

export const getRequestSuccess = ( data ) => {
  return {
    type: GET_REQUEST_SUCCESS,
    data
  }
}

export const getRequestFailed = ( error ) => {
  return {
    type: GET_REQUEST_FAILED,
    error
  }
}

export const getRequest = () => {
  const role = isAuthenticated().user.role;
  const userId = isAuthenticated().user._id;
  console.log("from the get request")
  return dispatch => {
    dispatch( getRequestStart() );
    fetch( `${ BASE_URL }/request/${ userId }/${ role }`, {
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
          dispatch( getRequestFailed( resp.error ) );
          return;
        }
        dispatch( getRequestSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( getRequestFailed( "Failed to fetch. Network Error" ) );
      } );
  }
}


/**
 * Get single request
 */
export const fetchRequestStart = () => {
  return {
    type: FETCH_REQUEST_START
  }
}

export const fetchRequestSuccess = ( data ) => {
  return {
    type: FETCH_REQUEST_SUCCESS,
    data
  }
}

export const fetchRequestFailed = ( error ) => {
  return {
    type: FETCH_REQUEST_FAILED,
    error
  }
}

export const fetchRequest = () => {
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch( fetchRequestStart() );
    fetch( `${ BASE_URL }/request/${ userId }`, {
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
          dispatch( fetchRequestFailed( resp.error ) );
          return;
        }
        dispatch( fetchRequestSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( fetchRequestFailed( "Failed to fetch. Network Error" ) );
      } );
  }
}
