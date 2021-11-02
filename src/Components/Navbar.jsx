import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../Actions";

const Navbar = () => {
  const state = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link class="navbar-brand" to="/">
        Admin Panel
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse " id="navbarSupportedContent">
        {state.isAuth && (
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" to="/">
                  Posts
                </Link>
                <Link class="dropdown-item" to="/service">
                  Services
                </Link>
                <Link class="dropdown-item" to="/customerFollowUp">
                  Customer Follow Up
                </Link>
              </div>
            </li>
          </ul>
        )}
        <div className="d-flex ">
          {!state.isAuth && (
            <Link to="/login">
              <button className="btn btn-primary btn-dark ">
                Login
              </button>
            </Link>
          )}
          {state.isAuth && (
            <button
              onClick={() => dispatch(allActions.loginActions.logout())}
              className="btn btn-primary btn-dark "
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
