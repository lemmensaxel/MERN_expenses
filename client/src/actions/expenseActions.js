import {
  GET_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE
} from "./types";

export const getExpenses = () => {
  return {
    type: GET_EXPENSES
  };
};
