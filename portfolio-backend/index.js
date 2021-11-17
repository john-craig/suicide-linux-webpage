require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

console.log("Container IP:", process.env.CONTAINER_IP);


//var commandRoutes = require('./routes/command')

var app = express();

// parse application/json
app.use(bodyParser.json());
app.use(cors())

//app.use('/command', commandRoutes)

app.listen(8282);
