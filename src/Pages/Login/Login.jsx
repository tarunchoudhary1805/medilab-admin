import React, { useState } from "react";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../Actions";

const Login = () => {
  const state = useSelector((state) => state.LoginReducer);
  console.log(state);
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });
  let token = localStorage.getItem("token");
  const submit = (e) => {
    e.preventDefault();
    console.log(data);
    token = "abcdefgh";
    dispatch(allActions.loginActions.login("token"));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  if (state?.isAuth) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container  my-5 border-0">
        <form className="login-form">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={data.email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={data.password}
              name="password"
              onChange={handleChange}
            />
          </div>

          <button type="button" onClick={submit} class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
};

export default Login;
