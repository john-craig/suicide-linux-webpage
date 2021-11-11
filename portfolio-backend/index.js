require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

var commandRoutes = require('./routes/command')

var app = express();

// parse application/json
app.use(bodyParser.json());
app.use(cors())

app.use('/command', commandRoutes)

app.listen(8282);