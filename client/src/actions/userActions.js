import jwtDecode from "jwt-decode";
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

export const login = (username, password) => {
  return dispatch => {
    dispatch({ type: LOGIN_REQUEST });

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: '{"username": "' + username + '", "password": "' + password + '"}'
    })
      .then(res => {
        if (res.status == 200) {
          res.json().then(json => {
            localStorage.authToken = json.token;
            dispatch({
              type: LOGIN_SUCCESS,
              user: jwtDecode(json.token)
            });
          });
        } else {
          dispatch({
            type: LOGIN_FAILURE,
            errorMessage: "Wrong credentials!"
          });
        }
      })
      .catch(res => {
        dispatch({
          type: LOGIN_FAILURE,
          errorMessage: "Failed to authenticate with API!"
        });
      });

    // api
    //   .post("/knock", credentials)
    //   .then(res => {
    //     localStorage.authToken = res.data.token;
    //     dispatch({
    //       type: LOGIN_SUCCESS,
    //       user: jwtDecode(res.data.token)
    //     });
    //   })
    //   .catch(res => {
    //     dispatch({
    //       type: LOGIN_FAILURE,
    //       errorMessage: res.data.error
    //     });
    //   });
  };
};

export const logout = () => {
  delete localStorage.authToken;
  return { type: LOGOUT };
};
