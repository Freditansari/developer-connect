import Axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  Axios.get("/api/profile")
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => {
      dispatch({ type: GET_PROFILE, payload: {} });
    });
};



//create profile
export const createProfile = (profileData, history) => dispatch => {
  Axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => {
      
      dispatch({ type: GET_ERRORS, payload: err.response.data })
    });
};

//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
