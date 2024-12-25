const { json } = require("express");
const user = require("../models/user.model");
const getUserInfo = async (req, res) => {
  try {
    const userDetail = await user.findAll();
    res.status(200).send(userDetail);
  } catch (error) {
    console.log(error);
  }
};
const createUser = async (req, res) => {
  const { name, email, age, phoneNo } = req.body;
  try {
    const data = await user.create({
      name,
      email,
      age,
      phoneNo,
    });
    res.status(200).json(data);
  } catch (error) {
    res.send("error");
  }
};
const updateuser = async (req, res) => {
  const id = req.params.id;
  const { name, email, age, phoneNo } = req.body;
  try {
    const updateData = await user.update(
      { name: name, email: email, age: age, phoneNo: phoneNo },
      { where: { id: id } }
    );
    res.status(200).json(updateData);
  } catch (error) {
    console.log(error);
  }
};
const deleteuser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedata = await user.destroy({ where: { id: id } });
    if (!id) {
      res.send("user not found");
    }
    res.json(deletedata);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getUserInfo, createUser, updateuser, deleteuser };
