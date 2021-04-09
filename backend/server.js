const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.Thesis_URI;
const cors = require("cors");

app.use(cors());
//Important!!! Recognize the request as a JSON Object
app.use(express.json());

const port = process.env.PORT || 4000;

//set up an express server for react app
app.listen(port, () => {
  console.log(`Server is running on port :${port}!`);
});

//connect server with mongodb
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.on("open", function () {
  console.log("Successfully connected to MongoDB!");
});

//mount middleware routers
var userRouter = require("./routes/user.route");
var postRouter = require("./routes/post.route");
var offerRouter = require("./routes/offer.route");

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/offer", offerRouter);
