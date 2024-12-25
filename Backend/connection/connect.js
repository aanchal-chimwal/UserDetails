const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("userlist", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("connect to db");
  } catch (error) {
    console.log(error);
  }
};
testConnection();
module.exports = sequelize;
