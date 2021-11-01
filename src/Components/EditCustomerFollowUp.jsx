import React, { useState } from "react";

const EditCustomerFollowUp = (props) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [dateOfFollowUp, setDateOfFollowUp] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(props);
  const submit = async () => {
    const data = { name, phoneNumber, email, description, dateOfFollowUp };
    props.submit(data);
  };
  const disable = () => {
    let res = true;
    if (name && phoneNumber && email && description && dateOfFollowUp) {
      return false;
    }
    return res;
  };
  return <></>;
};

export default EditCustomerFollowUp;
