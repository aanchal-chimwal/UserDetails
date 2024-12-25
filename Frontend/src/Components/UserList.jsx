import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../axios";
import { Button, Space, Table, Modal } from "antd";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
function UserList() {
  const [user, setuser] = useState([]);
  const [isModel, setisModel] = useState(false);
  const [editModel, seteditModel] = useState(false);
  const [selecteduser, setselecteduser] = useState(null);
  const handleModalClose = () => {
    setisModel(false);
    seteditModel(false);
    setselecteduser(null);
  };
  const handleEdit = (record) => {
    seteditModel(true);
    setselecteduser(record);
  };
  const fetchdata = () => {
    axiosInstance
      .get("/getuser")
      .then((response) => {
        setuser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user",
      cancelText: "Cancel",
      onOk: () => {
        axiosInstance
          .delete(`/deleteuser/${id}`)
          .then(() => {
            fetchdata();
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
  };
  const addUser = () => {
    setisModel(true);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "useremail",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "userage",
    },
    {
      title: "PhoneNo",
      dataIndex: "phoneNo",
      key: "userno",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <>
              <Button
                type="primary"
                className="bg-orange-500"
                icon={<EditOutlined />}
                key="edit"
                onClick={() => handleEdit(record)}
              ></Button>
              <Button
                type="primary"
                className="bg-orange-500"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
              ></Button>
            </>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8">
        <h1 className="text-center text-white bg-orange-400 font-medium m-4 p-5 text-2xl rounded-md">
          {" "}
          User List
        </h1>
        <div className="flex justify-end">
          <button
            className="rounded-lg text-xl text-white bg-orange-400 p-2 m-5"
            onClick={addUser}
          >
            Add User
          </button>
        </div>
      </div>

      {/* {user.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))} */}
      {isModel && (
        <AddUser
          isModel={isModel}
          onClose={handleModalClose}
          setisModel={setisModel}
          fetchdata={fetchdata}
        />
      )}
      {editModel && (
        <EditUser
          editModel={editModel}
          seteditModel={seteditModel}
          onClose={handleModalClose}
          user={selecteduser}
          fetchdata={fetchdata}
        />
      )}
      <Table
        dataSource={user}
        columns={columns}
        rowKey={(record) => record.id}
      />
    </>
  );
}

export default UserList;
