import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axiosInstance from "../axios";

function EditUser({ editModel, onClose, fetchdata, user }) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  const [phoneNo, setphoneNo] = useState("");

  useEffect(() => {
    if (user) {
      setname(user.name || "");
      setemail(user.email || "");
      setage(user.age || "");
      setphoneNo(user.phoneNo || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/updateuser/${user.id}`, {
        name,
        email,
        age,
        phoneNo,
      });
      onClose();
      fetchdata();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Edit User"
      open={editModel}
      onCancel={onClose}
      width={500}
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

export default EditUser;
