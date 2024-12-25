import { useState } from "react";
import { Button, Modal } from "antd";
import axiosInstance from "../axios";

function AddUser({ isModel, onClose, setisModel, fetchdata }) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const checkformvalid = name && email && age && phoneNo;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      alert("Phone Number must be valid");
      return;
    }
    const userData = { name, email, age, phoneNo };

    // Sending data to the backend
    axiosInstance
      .post("/createuser", userData)
      .then((response) => {
        console.log(response);
        setisModel(false);
        fetchdata();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      title="Add User"
      open={isModel}
      onCancel={onClose}
      width={500}
      style={{ textAlign: "center" }}
      footer={[
        <Button className="bg-orange-500" key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          className="bg-orange-500"
          key="save"
          type="primary"
          htmlType="submit"
          form="adduserform"
          disabled={!checkformvalid}
        >
          Submit
        </Button>,
      ]}
    >
      <form
        id="adduserform"
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <label>Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <label>Age:</label>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setage(e.target.value)}
        />{" "}
        <label>Phone Number:</label>
        <input
          type="number"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setphoneNo(e.target.value)}
        />
      </form>
    </Modal>
  );
}

export default AddUser;
