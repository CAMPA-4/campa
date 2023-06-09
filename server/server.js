const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('../db/mongoDB');
const cookieParser = require('cookie-parser');


//require routers
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chatRouter");

// RUNNING SERVER
const app = express();
const PORT = 3000;

const apiRouter = require('./routes/apiRouter');


// connect mongodb server
app.use(express.json());
app.use(cors());

app.use(cookieParser());
//create router
app.use("/api/auth", authRouter);
app.use('/api/chat', chatRouter)
app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.cookie('App','Jarvis')
  res.cookie('secret', `${Math.floor(Math.random()*100)}`)
  return res.sendFile(path.resolve(__dirname, "../client/index.html"));
});


app.use('/api', apiRouter);

//unknown route handler

// GLOBAL ERROR ROUTE
app.use((err, req, res, next) => {
  // console.log(req.body)
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred unknown one" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  // console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.get("*", (req, res) => {
  res.status(404).json("Unknown route error");
});

// SERVER
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
