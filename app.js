const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const mainRouter = require("./routes/mainrouts");
const mlab = require("./config");
const clean = require("./clean");
let baza = require("./models/mwerlebi");



//db set
mongoose.connect(mlab.dbLink);
let db = mongoose.connection;
db.once('open', clean.mongoconnect)
db.on("error", clean.mongoerr)

//view engine
app.set('views', path.join(__dirname, "views"));
app.set('view engine', "pug");
app.use('/public', express.static('public'))

//body oarser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routing
app.use('/', mainRouter);

//ports
app.listen(process.env.PORT || 80, clean.portcallback)