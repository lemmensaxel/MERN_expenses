import { GET_USERS, ADD_USER, EDIT_USER, DELETE_USER } from "../actions/types";

const initialState = {
  users: [
    {
      name: "Axel Lemmens",
      username: "lemmensaxel",
      password: "Test123",
      salt: "fn,dklosmn cqtu qzeormi cfjuifgqhsd",
      email: "lemmensaxel@gmail.com",
      level: 2
    },
    {
      name: "Birte Geusens",
      username: "birte",
      password: "Test123",
      salt: "fn,dklosmn cqtu qzeormi cfjuifgqhsd",
      email: "dauwdruppelke@gmail.com",
      level: 1
    },
    {
      name: "Dirk Lemmens",
      username: "dirk",
      password: "Test123",
      salt: "fn,dklosmn cqtu qzeormi cfjuifgqhsd",
      email: "dirk.jm.lemmens@icloud.com",
      level: 2
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state
      };
    default:
      return state;
  }
}
