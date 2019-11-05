import {
  PAY_INCENTIVES_START,
  PAY_INCENTIVES_SUCCESS,
  PAY_INCENTIVES_FAILED,
} from "../actions/action_pay_incentives";

const initialState = {
  incentives: {},
  loading: false,
  success: false,
  error: ""
}

const incentivesReducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case PAY_INCENTIVES_START:
      return {
        ...state,
        loading: true
      }
    case PAY_INCENTIVES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        incentives: action.data
      }
    case PAY_INCENTIVES_FAILED:
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

export default incentivesReducer;