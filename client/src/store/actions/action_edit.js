import { isAuthenticated } from "../../helper/authenticate";
export const EDIT_START = "EDIT_START";
export const EDIT_SUCCESS = "EDIT_SUCCESS";
export const EDIT_FAILED = "EDIT_FAILED";

export const UPLOAD_PHOTO_START = "UPLOAD_PHOTO_START";
export const UPLOAD_PHOTO_SUCCESS = "UPLOAD_PHOTO_SUCCESS";
export const UPLOAD_PHOTO_FAILED = "UPLOAD_PHOTO_FAILED";

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Edit action type for agent profile update
 */

export const editStart = () => {
  return {
    type: EDIT_START
  }
}

export const editSuccess = ( data ) => {
  return {
    type: EDIT_SUCCESS,
    data
  }
}

export const editFailed = ( error ) => {
  return {
    type: EDIT_FAILED,
    error
  }
}

/**
 * Action creator for agent profile update
 * @param {data} data of the user to be edited
 */
export const onEdit = ( data ) => {
  const userId = isAuthenticated().user ? isAuthenticated().user._id : null;
  return dispatch => {
    dispatch(editStart())
    fetch( `${ BASE_URL }/user/update/${userId}`, {
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
          dispatch( editFailed( resp.error ) );
          return;
        }
        dispatch( editSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( editFailed( "Network Error. Please check your internet connection and try again" ) );
      } );
  }
}

export const uploadPhotoStart = () => {
  return {
    type: UPLOAD_PHOTO_START
  }
}

export const uploadPhotoSuccess = ( data ) => {
  return {
    type: UPLOAD_PHOTO_SUCCESS,
    data
  }
}

export const uploadPhotoFailed = ( error ) => {
  return {
    type: UPLOAD_PHOTO_FAILED,
    error
  }
}

export const uploadProfilePhoto = ( data ) => {
  const token = isAuthenticated().token;
  const userId = isAuthenticated().user._id;

  return dispatch => {
    dispatch( uploadPhotoStart() );
    fetch( `${ BASE_URL }/profile/upload/${userId}`, {
      method: "PUT",
      headers: {
        "x-auth-token": token
      },
      body: data
    } )
      .then( response => response.json() )
      .then( resp => {
        if ( resp.error ) {
          dispatch( uploadPhotoFailed( resp.error ) );
          return;
        }
        dispatch( uploadPhotoSuccess( resp ) );
      } )
      .catch( err => {
        dispatch( uploadPhotoFailed( "Upload failed. Please try again" ) );
      } );
  }
}