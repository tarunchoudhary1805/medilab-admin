import React, { useState, useEffect } from "react";
import Add from "./Add";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Edit from "./Edit";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
// import { toast } from "react-toastify";

let data;
// import { getBloglistApi } from "../../apiList";

const Blog = () => {
  const editor = { ClassicEditor };
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editBlog, setEditBlog] = useState();
  const [show, setShow] = useState(false);
  const [i, setI] = useState();

  useEffect(() => {
    // setLoading(true);
    // (async () => {
    //   const response = await fetch(getBloglistApi)
    //     .then((res) => res.json())
    //     .catch((err) => toast.error(err));
    //   if (response?.status === true) {
    //     setBlogs(response.data);
    //   }
    //   setLoading(false);
    // })();
  }, []);

  const submit = async (blog) => {
    setLoading(true);
    // const response1 = await fetch(getBloglistApi, {
    //   method: "POST",
    //   body: JSON.stringify(blog),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .catch((err) => console.log(err));
    // if (response1.success === true) {
    const data = [...blogs];
    data.push(blog);
    // toast("Blog Added Successfully");
    setBlogs(data);
    // }
    setLoading(false);
    setShow(!show);
  };

  const handleDelete = async (i, id) => {
    setLoading(true);
    // const response2 = await fetch(`${getBloglistApi}/${id}`, {
    //   method: "DELETE",
    // })
    //   .then((res) => res.json())
    //   .catch((err) => console.log(err));

    // if (response2.success === true) {
    const d1 = [...blogs];
    d1.splice(i, 1);
    // toast("Blog Deleted Successfully");
    setBlogs(d1);
    // }
    setLoading(false);
  };

  const handleEdit = async (blog, e) => {
    setLoading(true);
    // const response2 = await fetch(`${getBloglistApi}/${editBlog._id}`, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(blog),
    // })
    //   .then((res) => res.json())
    //   .catch((err) => console.log(err));

    const value = [...blogs];
    value[i] = blog;
    setBlogs(value);
    setLoading(false);
    setEdit(false);
  };

  return (
    <div className="container border p-2">
      {/* <ToastContainer /> */}
      <h4 className="text-center">Blogs</h4>
      <div className="d-flex justify-content-end">
        {!edit && (
          <button className="btn btn-primary" onClick={() => setShow(!show)}>
            {show ? "X" : "Add Blog"}
          </button>
        )}
      </div>

      {show && <Add submit={(blog) => submit(blog)} />}
      <br />
      <br />
      {edit && (
        <Edit
          Blog={editBlog}
          cancel={() => setEdit(!edit)}
          handleEdit={(blog) => handleEdit(blog)}
        />
      )}
      <div className="text-center">
        {loading && (
          <div class="spinner-border text-center" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <div>
        {!show && !edit && (
          <ol>
            {blogs?.map((blog, i) => (
              <div className="d-flex justify-content-between container my-2">
                <li key={blog._id}>
                  <h2>{blog.title}</h2>
                  <p>{ReactHtmlParser(blog.desc)}</p>
                </li>
                <div className="d-flex">
                  <button
                    className="btn btn-success mx-2"
                    onClick={() => {
                      setEditBlog(blog);
                      setEdit(true);
                      setI(i);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleDelete(i, blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default Blog;