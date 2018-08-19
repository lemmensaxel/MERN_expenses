import { GET_USERS, ADD_USER, EDIT_USER, DELETE_USER } from "../actions/types";

export const getUsers = () => {
  return {
    type: GET_USERS
  };
};

export const deleteUser = id => {
  return {
    type: DELETE_USER,
    payload: id
  };
};

export const addUser = newUser => {
  return {
    type: ADD_USER,
    payload: newUser
  };
};

export const editUser = newUser => {
  return {
    type: EDIT_USER,
    payload: newUser
  };
};
