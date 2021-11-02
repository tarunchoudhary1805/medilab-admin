import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import logo from "../../assets/logo.png";
import CreateCustomerFollowUp from "../../Components/createCustomerFollowUp";
import CreateService from "../../Components/createService";
import EditCustomerFollowUp from "../../Components/EditCustomerFollowUp";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const CustomerFollowUp = () => {
  const state = useSelector((state) => state.LoginReducer);
  const [data, setData] = useState([]);
  const [i, setI] = useState();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfFollowUp, setDateOfFollowUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  //   console.log(props);
  const save = async () => {
    const data = { name, phoneNumber, email, description, dateOfFollowUp, id };
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaa", data);
    setLoading(true);
    try {
      const response = await fetch(
        " https://vardaa.herokuapp.com/updateFollowUps",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const value = await response.json();
      console.log(value);
      if (value) {
        setData(value);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      let res = await fetch(
        `https://vardaa.herokuapp.com/deleteCustomersFollowUp/${id}`,
        {
          method: "DELETE",
        }
      );
      let x = await res.json();
      console.log(x);
      if (x) {
        setData(x);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const disable = () => {
    let res = true;
    if (name && phoneNumber && email && description && dateOfFollowUp) {
      return false;
    }
    return res;
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://vardaa.herokuapp.com/getAllCustomersFollowUp"
        );
        const value = await response.json();
        console.log(value);
        if (value) {
          setData(value);
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    })();
  }, []);
  const submit = async (item) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://vardaa.herokuapp.com/createCustomerFollowUp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );
      const value = await response.json();
      console.log(value);
      if (value) {
        let data1 = [...data];
        data1.push(value);
        setData(data1);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };
  if (!state.isAuth) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="container my-4">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              disabled
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>

          <CreateCustomerFollowUp submit={(item) => submit(item)} />
        </div>
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border " role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        <div className="my-3 cardd">
          {!data?.length > 0 && (
            <h5 className="text-center">No Customer Follow Up Available</h5>
          )}
          {data?.map((item, i) => (
            <>
              <div className="card my-5 p-2">
                <div className="card-body">
                  <h5 className="card-title">
                    {" "}
                    <div className="d-flex">
                      <div>
                        {" "}
                        <img src={logo} className="card-img mr-2 " alt="..." />
                        Heaven Real Estate
                      </div>
                      <div className="d-flex ">
                        <i
                          class="fas fa-trash-alt text-danger mx-2"
                          onClick={() => handleDelete(item._id)}
                        ></i>
                        <i
                          style={{ cursor: "pointer" }}
                          class="fas fa-edit text-success mx-2"
                          data-toggle="modal"
                          onClick={() => {
                            setI(i);
                            setName(item.name);
                            setPhoneNumber(item.phoneNumber);
                            setDescription(item.description);
                            setEmail(item.email);
                            setDateOfFollowUp(Date(item.dateOfFollowUp));
                            setId(item._id);
                          }}
                          data-target="#exampleModaledit"
                        ></i>
                      </div>
                    </div>
                  </h5>
                  <p className="card-text text-secondary m-0 p-0">
                    {item.name}
                  </p>
                  <p className="card-text text-secondary m-0 p-0">
                    {item.email}
                  </p>
                  <p className="card-text text-secondary m-0 p-0">
                    {item.phoneNumber}
                  </p>
                  <p className="card-text text-secondary m-0 p-0">
                    {item.description}
                  </p>
                  <p className="card-text text-secondary m-0 p-0">
                    {item.dateOfFollowUp}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>

        <div
          className="modal fade"
          id="exampleModaledit"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header ">
                <h5
                  className="modal-title text-align-center"
                  id="exampleModalLabel"
                >
                  Create Service
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      name="Name"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="phoneNumber"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      name="description"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="date"
                      name="date"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Description"
                      value={dateOfFollowUp}
                      onChange={(e) => setDateOfFollowUp(e.target.value)}
                    />
                  </div>
                </form>
                {loading && (
                  <div className="d-flex justify-content-center">
                    <div class="spinner-border " role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={save}
                  disabled={disable()}
                  data-dismiss="modal"
                >
                  {" "}
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default CustomerFollowUp;
