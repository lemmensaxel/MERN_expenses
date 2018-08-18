// Root reducer

import { combineReducers } from "redux";
import expenseReducer from "./expenseReducer";
import userReducer from "./userReducer";

export default combineReducers({
  expense: expenseReducer,
  user: userReducer
});
