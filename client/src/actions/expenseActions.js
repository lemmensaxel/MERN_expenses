import {
  GET_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  EXPENSES_LOADING
} from "./types";

export const getExpenses = () => {
  return dispatch => {
    dispatch(setExpensesLoading());
    fetch("/api/expenses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.authToken
      }
    }).then(res => {
      res.json().then(json => {
        dispatch({
          type: GET_EXPENSES,
          payload: json
        });
      });
    });
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

export const setExpensesLoading = () => {
  return {
    type: EXPENSES_LOADING
  };
};
