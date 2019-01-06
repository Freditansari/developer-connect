import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import Axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";

//action to register user
export const registerUser = (userData, history) => dispatch => {
  Axios.post("/api/user/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//action to login user - get user token
export const loginUser = userData => dispatch => {
  Axios.post("/api/user/login", userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);

      //decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));
    }).catch(err=>{ dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });})
   
   
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


//log user out 
export const logoutUser = () => dispatch => {
  // remove token from local Storage
  localStorage.removeItem('jwtToken');
  // remove auth header 
  setAuthToken(false);
  //set current user to empty with will set is authenticated to false
  dispatch(setCurrentUser({}));
}