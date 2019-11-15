import { isAuthenticated } from "../../helper/authenticate";

export const PAY_INCENTIVES_START = "PAY_INCENTIVES_START";
export const PAY_INCENTIVES_SUCCESS = "PAY_INCENTIVES_SUCCESS";
export const PAY_INCENTIVES_FAILED = "PAY-INCENTIVES_FAILED";

export const CARD_BOUGHT_START = "CARD_BOUGHT_STARTT";
export const CARD_BOUGHT_SUCCESS = "CARD_BOUGHT_SUCCESS";
export const CARD_BOUGHT_FAILED = "CARD_BOUGHT_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

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

export const payIncentives = ( refererPhone ) => {
  return dispatch => {
    dispatch( payIncentiveStart() );
    fetch( `${ BASE_URL }/refer/${ refererPhone }`, {
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
      // .then( () => {
      //   dispatch(cardBought())
      // })
      .catch( err => {
        dispatch( payIncentivesFailed( "Request failed. Network Error" ) );
      } );
  }
}


export const cardBouoghtStart = () => {
  return {
    type: CARD_BOUGHT_START
  }
}

export const cardBouoghtSuccess = ( data ) => {
  return {
    type: CARD_BOUGHT_SUCCESS,
    data
  }
}

export const cardBoughtFailed = ( error ) => {
  return {
    type: CARD_BOUGHT_FAILED,
    error
  }
}

export const cardBought = () => {
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch( cardBouoghtStart() );
    fetch( `${ BASE_URL }/user/card/${ userId }`, {
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
          dispatch( cardBoughtFailed( resp.error ) );
          return;
        }
        dispatch( cardBouoghtSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( cardBoughtFailed( "Some thing went wrong. Update failed" ) );
      } );
  }
}

