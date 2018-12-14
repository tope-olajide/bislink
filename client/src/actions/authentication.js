import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import setToken from '../utils/setToken';
import {
    SET_CURRENT_USER
  } from '../actions/type';
  const url = 'http://127.0.0.1:5000/api/user/'
  export function setCurrentUser(userData) {
    return {
      type: SET_CURRENT_USER,
      userData
    };
  }
export function signUp(userData) {
    return dispatch => axios.post(`${url}signup`, userData)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        dispatch(setCurrentUser(jsonwebtoken
          .decode(localStorage.getItem('token'))));
      });
  }
  export function signIn (userData) {
    return dispatch => axios.post(`${url}signin`, userData)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        dispatch(setCurrentUser(jsonwebtoken
          .decode(localStorage.getItem('token'))));
      });
  }