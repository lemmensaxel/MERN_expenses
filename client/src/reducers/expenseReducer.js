import {
  GET_EXPENSES,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE
} from "../actions/types";

const initialState = {
  expenses: [
    {
      name: "Vliegtuig tickets",
      amount: 654.65,
      payedBy: "Axel Lemmens",
      date: "18/08/2018"
    },
    {
      name: "Autohuur",
      amount: 123.45,
      payedBy: "Axel Lemmens",
      date: "18/08/2018"
    },
    {
      name: "Eten resto",
      amount: 78.45,
      payedBy: "Axel Lemmens",
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
    default:
      return state;
  }
}
