import {
  GET_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  EXPENSES_LOADING
} from "../actions/types";

const initialState = {
  expenses: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false
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
    case EXPENSES_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
