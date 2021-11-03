import React, { useState } from "react";

const CreatePost = (props) => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [bathroom, setbathroom] = useState("");
  const [bedroom, setbedroom] = useState("");
  const [hall, setHall] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "himanshuImages");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dse1vv6sd/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    console.log(file);

    setImage(file.secure_url);
    setLoading(false);
  };

  const submit = async () => {
    const data = {
      description,
      img: image,
      bathroom,
      bedroom,
      hall,
      kitchen,
      price,
      type,
      area,
    };
    console.log(data);
    props.submit(data);
    setDescription("");
    setImage("");
    setKitchen("");
    setPrice("");
    setHall("");
    setbathroom("");
    setbedroom("");
    setType("");
    setArea("");
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-success"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <i className="fas fa-user-plus"></i>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
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
                Create Post
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
                  <select
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                    name="type"
                    className="form-control"
                    placeholder="type of Property"
                  >
                    <option>Type of Property</option>
                    <option value="for_rent">For Rent</option>
                    <option value="for_sale">For Sale</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="bathroom"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Number of Bathroom"
                    value={bathroom}
                    onChange={(e) => setbathroom(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="area"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Area in SqFt"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="bedroom"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Number of BedRooms"
                    value={bedroom}
                    onChange={(e) => setbedroom(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="hall"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Number of halls"
                    value={hall}
                    onChange={(e) => setHall(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="kitchen"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Number of kitchen"
                    value={kitchen}
                    onChange={(e) => setKitchen(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    name="fullName"
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
                    type="file"
                    className="form-control"
                    name="image"
                    placeholder="Upload an Image"
                    onChange={uploadImage}
                  ></input>
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
                onClick={submit}
                disabled={!image}
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
};

export default CreatePost;
