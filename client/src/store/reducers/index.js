import { combineReducers } from "redux";
import register from "./reducers_registration"
import login from "./reducers_login";
import edit from "./reducers_edit";
import users from "./reducers_user";
import incentives from "./reducers_pay_incentives";

const rootReducer = combineReducers( {
  register,
  login,
  edit,
  users,
  incentives,
} );

export default rootReducer;