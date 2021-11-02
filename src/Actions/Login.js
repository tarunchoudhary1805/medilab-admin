const login = (token) => {
  console.log(token);
  
  return {
    type: "LOGIN",
    payload: token,
  };
};

const logout = () => {
  return {
    type: "LOGOUT",
  };
};

const loadUser = () => {
  return {
    type: "LOAD_USER",
  };
};

export default {
  login,
  logout,
  loadUser,
};
