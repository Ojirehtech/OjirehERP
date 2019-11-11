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
    fetch( `${ BASE_URL }`, {
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