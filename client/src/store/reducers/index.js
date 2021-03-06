import { combineReducers } from "redux";
import register from "./reducers_registration"
import login from "./reducers_login";
import edit from "./reducers_edit";
import users from "./reducers_user";
import incentives from "./reducers_pay_incentives";
import transaction from "./reducers_transaction";
import role from "./reducers_roles";
import loan from "./reducers_loan";
import admin from "./reducers_admin";
import transfer from "./reducers_transfer";

const rootReducer = combineReducers( {
  register,
  login,
  edit,
  users,
  incentives,
  transaction,
  role,
  loan,
  admin,
  transfer,
} );

export default rootReducer;