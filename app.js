const express = require("express");
const fileupload = require("express-fileupload");

const app = express();
const mongoose = require("mongoose");

app.use(
  fileupload({
    createParentPath: true,
  })
);

app.use(express.json());
const learnRoutes = require("./routes/learn");
const userRoutes = require("./routes/user");
mongoose
  .connect("mongodb+srv://muhar:muhar123@cluster0.pm6qv9q.mongodb.net/lerero")
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/api/learn", learnRoutes);

app.use("/api/auth", userRoutes);

app.use(express.static("public"));
app.use("/images", express.static("images"));

module.exports = app;
