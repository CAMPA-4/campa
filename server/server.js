const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('../db/mongoDB');
const cookieParser = require('cookie-parser');


//require routers
const authRouter = require("./routes/auth");

// RUNNING SERVER
const app = express();
const PORT = 3000;

// connect mongodb server
app.use(express.json());
app.use(cors());

app.use(cookieParser());
//create router
app.use("/api/auth", authRouter);
app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.cookie('App','Jarvis')
  res.cookie('secret', `${Math.floor(Math.random()*100)}`)
  return res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

//unknown route handler
app.get("*", (req, res) => {
  res.status(404).json("Unknown route error");
});
// GLOBAL ERROR ROUTE
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// SERVER
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
