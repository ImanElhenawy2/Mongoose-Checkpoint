const express = require('express');
const cors = require('cors');

const app = express();
//connection database
require('./database');

app.use(cors())
app.use(express.json());

//include Routes
const personsRouter = require("./Routes/persons.router.js");

// use Routes
app.use("/person", personsRouter)


app.listen(8000, function () {
    console.log(' web server listening on port 8080')
  })