const express = require("express");
const {
  getUserInfo,
  createUser,
  updateuser,
  deleteuser,
} = require("../controller/user.controller");
const router = express.Router();
router.get("/getuser", getUserInfo);
router.post("/createuser", createUser);
router.put("/updateuser/:id", updateuser);
router.delete("/deleteuser/:id", deleteuser);
module.exports = router;
