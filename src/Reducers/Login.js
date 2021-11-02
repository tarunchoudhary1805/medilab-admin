const initialState = {
  user: "",
  token: localStorage.getItem("token"),
  isAuth: localStorage.getItem("isAuth"),
};

console.log(initialState);

function LoginReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USER":
      console.log(state.token);
      return {
        ...state,
      };
    case "LOGIN":
      localStorage.setItem("token", action.payload);
      localStorage.setItem("isAuth", true);
      return { ...state, token: action.payload, isAuth: true };

    case "LOGOUT":
      return { ...state, token: "", isAuth: false };
    default:
      return state;
  }
}
export default LoginReducer;
