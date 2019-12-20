import { isAuthenticated } from "../../helper/authenticate";

export const LOAN_REQUEST_START = "LOAN_REQUEST_START";
export const LOAN_REQUEST_SUCCESS = "LOAN_REQUEST_SUCCESS";
export const LOAN_REQUEST_FAILED = "LOAN_REQUEST_FAILED";

export const FETCH_ALL_LOAN_START = "FETCH_ALL_LOAN_START";
export const FETCH_ALL_LOAN_SUCCESS = "FETCH_ALL_LOAN_SUCCESS";
export const FETCH_ALL_LOAN_FAILED = "FETCH_ALL_LOAN_FAILED";

export const FETCH_LOAN_START = "FETCH_LOAN_START";
export const FETCH_LOAN_SUCCESS = "FETCH_LOAN_SUCCESS";
export const FETCH_LOAN_FAILED = "FETCH_LOAN_FAILED";

export const PAY_LOAN_START = "PAY_LOAN_START";
export const PAY_LOAN_SUCCESS = "PAY_LOAN_SUCCESS";
export const PAY_LOAN_FAILED = "PAY_LOAN_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Loan request
 */
export const loanRequestStart = () => {
  return {
    type: LOAN_REQUEST_START
  }
}

export const loanRequestSuccess = ( data ) => {
  return {
    type: LOAN_REQUEST_SUCCESS,
    data
  }
}

export const loanRequestFailed = ( error ) => {
  return {
    type: LOAN_REQUEST_FAILED,
    error
  }
}

export const loanRequest = ( amount ) => {
  const userId = isAuthenticated().user._id;
  return dispatch => {
    dispatch( loanRequestStart() );
    fetch( `${ BASE_URL }/loan/${ userId }`, {
      method: "POST",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify(amount)
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( loanRequestFailed( resp.error ) );
          return;
        }
        
        dispatch( loanRequestSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( loanRequestFailed( "Network Error. Check your network and try again" ) );
      } );
  }
}


/**
 * Loan request
 */
export const fetchLoansStart = () => {
  return {
    type: FETCH_ALL_LOAN_START
  }
}

export const fetchLoansSuccess = ( data ) => {
  return {
    type: FETCH_ALL_LOAN_SUCCESS,
    data
  }
}

export const fetchLoansFailed = ( error ) => {
  return {
    type: FETCH_ALL_LOAN_FAILED,
    error
  }
}

export const fetchLoans = () => {
  const userId = isAuthenticated().user._id;
  const role = isAuthenticated().user.role;
  return dispatch => {
    dispatch( fetchLoansStart() );
    fetch( `${ BASE_URL }/loans/${ userId }/${role}`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      },
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( fetchLoansFailed( resp.error ) );
          return;
        }

        dispatch( fetchLoansSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( fetchLoansFailed( "Network Error. Check your network and try again" ) );
      } );
  }
}


/**
 * Loan request
 */
export const fetchLoanStart = () => {
  return {
    type: FETCH_LOAN_START
  }
}

export const fetchLoanSuccess = ( data ) => {
  return {
    type: FETCH_LOAN_SUCCESS,
    data
  }
}

export const fetchLoanFailed = ( error ) => {
  return {
    type: FETCH_LOAN_FAILED,
    error
  }
}

export const fetchLoan = () => {
  const userId = isAuthenticated().user._id;
  const role = isAuthenticated().user.role;
  return dispatch => {
    dispatch( fetchLoanStart() );
    fetch( `${ BASE_URL }/loan/${ role }/${ userId }`, {
      method: "GET",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      },
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( fetchLoanFailed( resp.error ) );
          return;
        }

        dispatch( fetchLoanSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( fetchLoanFailed( "Network Error. Check your network and try again" ) );
      } );
  }
}


/**
 * Loan request
 */
export const payLoanStart = () => {
  return {
    type: PAY_LOAN_START
  }
}

export const payLoanSuccess = ( data ) => {
  return {
    type: PAY_LOAN_SUCCESS,
    data
  }
}

export const payLoanFailed = ( error ) => {
  return {
    type: PAY_LOAN_FAILED,
    error
  }
}

export const payLoan = ( userId, loanId, amount ) => {
  return dispatch => {
    dispatch( payLoanStart() );
    fetch( `${ BASE_URL }/loan/${ userId }/${ loanId }`, {
      method: "PUT",
      headers: {
        ACCEPT: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": isAuthenticated().token
      },
      body: JSON.stringify(amount)
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( payLoanFailed( resp.error ) );
          return;
        }
        dispatch( payLoanSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( payLoanFailed( "Network Error. Check your network and try again" ) );
      } );
  }
}