var app = require('express')();
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var expressMongoDb = require('express-mongo-db');
var ObjectID = mongodb.ObjectID;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var CONTACTS_COLLECTION = "contacts";
const MONGO_URI = 'mongodb://crateTest:password@ds125489.mlab.com:25489/crate';
const dbName = 'crate';
app.use(bodyParser.json());






// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
// Connect to the database before starting the application server.
mongodb.MongoClient.connect(MONGO_URI, function(err, client) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");



    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// =============================== Express things ==================================

var exphbs = require('express-handlebars')
var path = require('path');
var bodyParser = require('body-parser')
var express = require('express');
//For BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname, '/views/')));
app.use(express.static(path.join(__dirname, '/views/layouts/css')));
// app.use(express.static(path.join(__dirname, '/views/layouts/css')));

app.set('views', './views');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, '/views/'),
    layoutsDir: path.join(__dirname, 'views/layouts'),
}));
app.set('view engine', 'handlebars');







var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb(MONGO_URI));



var async = require('async');



// =============================== Grabbing from DB ==================================


app.get('/grab', function(req, res, next) {
    req.db // => Db object
        // console.log("grabbing the db object!", req.db)
    const collection = db.collection('user2.files');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        // console.log(docs)
        // return docs;
        grabbed(docs);

    });



    function grabbed(docs) {

        async.each(docs, handling, function() {

            function DisplayListTrack(trackId, databaseId, name, added, size) {

                this.trackId = trackId;
                this.databaseId = databaseId;
                this.name = name;
                this.added = added;
                this.size = size;
                this.showStats = function() {
                    console.log(this);
                }
            }

            var handoff = new DisplayListTrack(docs._id, docs.filename, docs.uploadDate, docs.size)

            handoff.trackId = 0;
            ++handoff.trackId;


            var userList = [];

            userList.push(handoff);

            handling(userList)

        });


        var userList = [];

        function handling(handoff, userList) {


            console.log("___________________")
            console.log(userList);
            console.log("___________________")

        }

    }

});


// =============================== /Grabbing from DB ==================================

/*

     res.render("list", {
          payloadArr: payloadArr,
          title: trackPayload.titled,
          uploadDate: trackPayload.uploaded

         })

[ { _id: 5ac9a909e6d833624c00b1c2,
    length: 8,
    chunkSize: 261120,
    uploadDate: 2018-04-08T05:30:49.996Z,
    md5: 'e552be5ab5fabd084d215a21f345dd54',
    filename: './ct.mp3' },
  { _id: 5ac9a90fbd2ee16256f87a7c,
    length: 8,
    chunkSize: 261120,
    uploadDate: 2018-04-08T05:30:55.869Z,
    md5: 'e552be5ab5fabd084d215a21f345dd54',
    filename: './ct.mp3' } ]

    */