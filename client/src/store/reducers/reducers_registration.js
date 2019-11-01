import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "../actions/actions_signup";

const initialState = {
  agents: [],
  loading: false,
  success: false,
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
    default:
      return state;
  }
}

export default registrationReducer;