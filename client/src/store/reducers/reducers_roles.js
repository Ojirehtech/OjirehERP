import {
  ROLE_START,
  ROLE_SUCCESS,
  ROLE_FAILED
} from "../actions/action.role";

const initialState = {
  loading: false,
  role: {},
  success: false,
  error: ""
}

const roleReducers = ( state = initialState, action ) => {
  switch ( action.type ) {
    case ROLE_START:
      return {
        ...state,
        loading: true
      }
    case ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        role: action.data,
      }
    case ROLE_FAILED:
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

export default roleReducers;