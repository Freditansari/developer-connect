const initialState = {
  age: 20,
  potato: true,
  name: '',
  address:''
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "AGE_UP":
      newState.age += action.value;
      newState.loading = false;
      break;

    case "AGE_DOWN":
      newState.age -= action.value;
      break;
    case "CHANGE_NAME":
      newState.name = action.value.name;
      newState.address = action.value.address;
      break;
    case "LOADING":
      newState.loading = true;
  }
  return newState;
};

export default reducer;
