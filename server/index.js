const userRoutes = require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", userRoutes);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("BD Connection is successful");
  })
  .catch((err) => {
    console.log(err.message);
  });
const server = app.listen(process.env.PORT, () => {
  console.log("Server started on port 8080");
});
