import {
  GET_USERS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "../actions/types";
import uuid from "uuid";
import jwtDecode from "jwt-decode";

const initialState = (token => ({
  isAuthenticating: false,
  currentUser: token ? jwtDecode(token) : null,
  errorMessage: null,
  users: [
    {
      id: "97e08c1e-b132-41b6-9a40-55c6fd030041",
      name: "Axel Lemmens",
      username: "lemmensaxel",
      password: "Test123",
      salt: "fn,dklosmn cqtu qzeormi cfjuifgqhsd",
      email: "lemmensaxel@gmail.com",
      level: 2
    },
    {
      id: "2cfdcd0f-6bed-4fb2-9034-471ed9252cc4",
      name: "Birte Geusens",
      username: "birte",
      password: "Test123",
      salt: "fn,dklosmn cqtu qzeormi cfjuifgqhsd",
      email: "dauwdruppelke@gmail.com",
      level: 1
    },
    {
      id: uuid(),
      name: "Dirk Lemmens",
      username: "dirk",
      password: "Test123",
      salt: "fn,dklosmn cqtu qzeormi cfjuifgqhsd",
      email: "dirk.jm.lemmens@icloud.com",
      level: 2
    }
  ]
}))(localStorage.authToken);

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map(
          user => (user.id === action.payload.id ? action.payload : user)
        )
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticating: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        errorMessage: action.errorMessage
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        currentUser: action.user,
        errorMessage: null
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticating: false,
        currentUser: null,
        errorMessage: null
      };
    default:
      return state;
  }
}
