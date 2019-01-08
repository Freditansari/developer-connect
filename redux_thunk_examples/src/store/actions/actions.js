import axios from "axios";

export const loading = () => {
  return {
    type: "LOADING"
  };
};

export const ageUpAsnc = val => {
  return { type: "AGE_UP", value: val };
};

export const ageUp = val => dispach => {
  dispach(loading());
  setTimeout(() => {
    dispach(ageUpAsnc(val));
  }, 10);
};

export const changeName = newName => dispatch => {
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      dispatch(changeNameAsync(res.data))
    })
    .catch(err => console.log(err));
};

export const changeNameAsync = val => {
  return { type: "CHANGE_NAME", value: val };
};

export const ageDown = val => {
  return { type: "AGE_DOWN", value: val };
};
