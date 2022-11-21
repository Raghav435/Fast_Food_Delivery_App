const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: ".env" });
const path = require("path");
const morgan = require("morgan");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to database succesfully");
  } catch (err) {
    console.log("Something error in connection");
  }
  console.log(`Server is lestening on ${PORT}`);
});
