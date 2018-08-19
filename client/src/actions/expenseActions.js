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

export const deleteExpense = id => {
  return {
    type: DELETE_EXPENSE,
    payload: id
  };
};

export const addExpense = newExpense => {
  return {
    type: ADD_EXPENSE,
    payload: newExpense
  };
};

export const editExpense = newExpense => {
  return {
    type: EDIT_EXPENSE,
    payload: newExpense
  };
};
