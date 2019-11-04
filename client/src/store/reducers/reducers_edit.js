import {
  EDIT_START,
  EDIT_SUCCESS,
  EDIT_FAILED,
  UPLOAD_PHOTO_START,
  UPLOAD_PHOTO_SUCCESS,
  UPLOAD_PHOTO_FAILED,
} from "../actions/action_edit";
 
const initialState = {
  edit: {},
  loading: false,
  success: false,
  error: ""
}

const editReducers = ( state = initialState, action ) => {
  switch ( action.type ) {
    case EDIT_START:
      return {
        ...state,
        loading: true
      }
    case EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        edit: action.data
      }
    case EDIT_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    case UPLOAD_PHOTO_START:
      return {
        ...state,
        loading: true
      }
    case UPLOAD_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        edit: action.data
      }
    case UPLOAD_PHOTO_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default editReducers;