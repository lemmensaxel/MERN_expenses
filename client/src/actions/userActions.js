import { GET_USERS, ADD_USER, EDIT_USER, DELETE_USER } from "../actions/types";

export const getUsers = () => {
  return {
    type: GET_USERS
  };
};
