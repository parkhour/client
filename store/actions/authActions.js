import axios from "axios";
import { AsyncStorage } from "react-native";
const baseUrl = "";

export const register = newUser => {
  let userDetail;
  return (dispatch, getState) => {
    axios
      .post(baseUrl + "/users/register", newUser)
      .then(({ data }) => {
        userDetail = data;
        return AsyncStorage.setItem("token", data.token);
      })
      .then(() => {
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: userData
        });
      })
      .catch(err => {
        dispatch({
          type: "REGISTER_ERROR",
          payload: err.message
        });
      });
  };
};

export const login = user => {
  let userDetail;
  return (dispatch, getState) => {
    axios
      .post(baseUrl + "/users/login", user)
      .then(({ data }) => {
        userDetail = data;
        return AsyncStorage.setItem("token", data.token);
      })
      .then(() => {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: userDetail
        });
      })
      .catch(err => {
        dispatch({
          type: "LOGIN_ERROR",
          payload: err.message
        });
      });
  };
};

export const logout = () => {
  return {
    type: "SIGNOUT_SUCCESS"
  };
};

export const clearAuthError = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'CLEAR_AUTH_ERROR'
        })
    }
}
