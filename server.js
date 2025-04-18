const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const connectDB = require('./config/db')
const bodyParser = require('body-parser')
const routes = require("./routes/index")
const app = express();

connectDB()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routes)

app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });