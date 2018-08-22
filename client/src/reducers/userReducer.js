import {
  GET_USERS,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  USERS_LOADING
} from "../actions/types";
import jwtDecode from "jwt-decode";

const initialState = (token => ({
  isAuthenticating: false,
  currentUser: token ? jwtDecode(token) : null,
  errorMessage: null,
  loading: false,
  users: []
}))(localStorage.authToken);

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
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
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
