import { combineReducers } from "redux";
import register from "./reducers_registration"
import login from "./reducers_login";
import edit from "./reducers_edit";
import users from "./reducers_user";

const rootReducer = combineReducers( {
  register,
  login,
  edit,
  users,
} );

export default rootReducer;