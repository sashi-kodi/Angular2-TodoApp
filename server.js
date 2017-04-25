var express = require('express');
var path= require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app=express();
var index = require('./routes/index');
var tasks = require('./routes/tasks');

//view engine
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', index);
app.use('/api',tasks);
mongoose.connect('mongodb://sashikodi:omsai28@ds151927.mlab.com:51927/whitebox');
var db=mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open', function(){
    console.log('database connection to Mongoose has been established');
});
app.listen(8000,function(){
    console.log('server started on port 8000');
});
