import {
  GET_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE
} from "../actions/types";

import uuid from "uuid";

const initialState = {
  expenses: [
    {
      id: uuid(),
      name: "Vliegtuig tickets",
      amount: 654.65,
      payedBy: "97e08c1e-b132-41b6-9a40-55c6fd030041",
      date: "18/08/2018"
    },
    {
      id: uuid(),
      name: "Autohuur",
      amount: 123.45,
      payedBy: "2cfdcd0f-6bed-4fb2-9034-471ed9252cc4",
      date: "18/08/2018"
    },
    {
      id: uuid(),
      name: "Eten resto",
      amount: 78.45,
      payedBy: "97e08c1e-b132-41b6-9a40-55c6fd030041",
      date: "18/08/2018"
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          expense => expense.id !== action.payload
        )
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses]
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(
          expense =>
            expense.id === action.payload.id ? action.payload : expense
        )
      };
    default:
      return state;
  }
}
