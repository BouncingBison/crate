var express = require('express')
var app = express()
var bodyParser = require('body-parser')
    // var path = require('path');
    // var methodOverride = require('method-override');



var database = require('./index.js');

app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res) {

    ping()
    res.sendFile('index.html');
    console.log("stuff");

})


// handle uploads
app.post('/upload', function(req, res) {

    upload()

});


app.use(function(req, res, next) {
    res.status(404).send("Can not find page")
});

app.listen(5000, function(err) {
    if (!err)
        console.log("Navigate to localhost:5000");
    else console.log(err)

});