const express = require("express");
const sequelize = require("./connection/connect");
const cors = require("cors");
const app = express();
const port = 5000;
const user = require("./routes/user.route");
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/api/v1", user);
sequelize.sync().then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
});
