import { combineReducers } from "redux";
import register from "./reducers_registration"
import login from "./reducers_login";

const rootReducer = combineReducers( {
  register,
  login
} )

export default rootReducer;