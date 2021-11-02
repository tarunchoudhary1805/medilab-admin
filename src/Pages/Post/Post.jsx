import React, { useState, useEffect } from "react";
import CreatePost from "../../Components/createPost";
import "../../App.css";
import logo from "../../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";

const Post = () => {
  const state = useSelector((state) => state.LoginReducer);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://vardaa.herokuapp.com/getAllPosts"
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
  }, [state]);
  const submit = async (item) => {
    setLoading(true);
    try {
      const response = await fetch("https://vardaa.herokuapp.com/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
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
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      let res = await fetch(`https://vardaa.herokuapp.com/deletePost/${id}`, {
        method: "DELETE",
      });
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

          <CreatePost submit={(item) => submit(item)} />
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
            <h5 className="text-center">No Posts Available</h5>
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
                      </div>
                    </div>
                  </h5>
                  <p className="card-text">{item.description}</p>
                </div>
                <img src={item.img} className=" img card-img-top" alt="..." />
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
};

export default Post;
