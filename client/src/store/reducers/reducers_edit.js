import {
  EDIT_START,
  EDIT_SUCCESS,
  EDIT_FAILED,
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
    default:
      return state;
  }
}

export default editReducers;