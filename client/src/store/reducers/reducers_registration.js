import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  DATA_UPLOAD_START,
  DATA_UPLOAD_SUCCESS,
  DATA_UPLOAD_FAILED
} from "../actions/actions_signup";

const initialState = {
  agents: [],
  loading: false,
  success: false,
  dataLoading: false,
  dataSuccess: false,
  error: ""
}

/**
 * 
 * @param {state} state of the application at a given moment
 * @param {action} action taking place in the application at a given moment
 */
const registrationReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case REGISTRATION_START:
      return {
        ...state,
        loading: true,
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        agents: state.agents.concat(action.data)
      }
    case REGISTRATION_FAILED:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.error
      }
    case DATA_UPLOAD_START:
      return {
        ...state,
        dataLoading: true
      }
    case DATA_UPLOAD_SUCCESS:
      return {
        ...state,
        dataLoading: false,
        dataSuccess: true,
        agents: action.data,
      }
    case DATA_UPLOAD_FAILED:
      return {
        ...state,
        dataLoading: false,
        dataSuccess: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default registrationReducer;