const express = require('express');
const cors = require('cors');

// RUNNING SERVER
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// GLOBAL ERROR ROUTE
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


// SERVER
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
