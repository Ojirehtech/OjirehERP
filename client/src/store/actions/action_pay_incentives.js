import { isAuthenticated } from "../../helper/authenticate";

export const PAY_INCENTIVES_START = "PAY_INCENTIVES_START";
export const PAY_INCENTIVES_SUCCESS = "PAY_INCENTIVES_SUCCESS";
export const PAY_INCENTIVES_FAILED = "PAY-INCENTIVES_FAILED";

const BASE_URL = "http://localhost:3030/api/v1";

export const payIncentiveStart = () => {
  return {
    type: PAY_INCENTIVES_START
  }
}

export const payIncentivesSuccess = ( data ) => {
  return {
    type: PAY_INCENTIVES_SUCCESS,
    data
  }
}

export const payIncentivesFailed = ( error ) => {
  return {
    type: PAY_INCENTIVES_FAILED,
    error
  }
}

export const payIncentives = () => {
  const refererId = isAuthenticated().user.refererId;
  return dispatch => {
    dispatch( payIncentiveStart() );
    fetch( `${ BASE_URL }/refer/${ refererId }`, {
      method: "PUT",
      headers: {
        ACCEPT: 'application/json',
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      }
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( payIncentivesFailed( resp.error ) )
          return;
        }
        dispatch( payIncentivesSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( payIncentivesFailed( "Request failed. Network Error" ) );
      } );
  }
}