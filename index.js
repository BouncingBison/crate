var app = require('express')();
var bodyParser = require("body-parser");

// Mongo DB modules 
var mongo = require("mongodb");
var expressMongoDb = require('express-mongo-db');
var ObjectID = require('mongodb').ObjectID;
var GridFSBucket = require('mongodb').GridFSBucket;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var CONTACTS_COLLECTION = "contacts";
const MONGO_URI = 'mongodb://crateTest:password@ds125489.mlab.com:25489/crate';
const dbName = 'crate';
const fs = require('fs');
var sanitizer = require('sanitizer');
var Grid = require('gridfs-stream');




app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
// Connect to the database before starting the application server.
mongo.MongoClient.connect(MONGO_URI, function(err, client) {
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
const { Readable } = require('stream');

// =============================== Grabbing from DB ==================================


app.get('/grab', function(req, res, next) {


    res.render("list")


});



app.get('/grab/:username', function(req, res, next) {

    // var username = req.params.username;
    var username = sanitizer.escape(req.params.username);

    console.log(typeof username);

    req.db // => Db object

    if (username) {

        const collection = db.collection(username + ".files");
        console.log(collection);

        const tracks = new Promise(function(resolve, reject) {
            resolve(collection.find({}).toArray(function(err, tracks) {
                assert.equal(err, null);

                grabbed(tracks);

                // console.log(tracks);
            }))
        })

    } else {

        console.log('waiting')


    }

    function grabbed(tracks) {

        console.log("_______Tracks_______");
        console.log('success');
        console.log(tracks);
        console.log("___________________");
        res.render("list", { tracks: tracks });

    }

    // var username = request.params.username;
    // findUserByUsername(username, function(error, user) {
    //     if (error) return next(error);

    //     return response.render('user', user);
    // });

});


// it may be possible to remove this 
app.post('/grab/:username', function(req, res, next) {


    var username = sanitizer.escape(req.body.username);

    // defining this variable as our URL variable
    var urlUsername = req.params.username;

    // var username = req.params.username;

    // setting our URL with our form data
    var urlUsername = username;

    console.log(req.params.username)
    console.log('URLUSERNAME', urlUsername)


    console.log(typeof username);

    req.db // => Db object

    if (username) {

        const collection = db.collection(username + ".files");

        const tracks = new Promise(function(resolve, reject) {
            resolve(collection.find({}).toArray(function(err, tracks) {
                assert.equal(err, null);

                grabbed(tracks, urlUsername);

                // console.log(tracks);
            }))
        })

    } else {

        console.log('waiting')


    }

    function grabbed(tracks, urlUsername) {

        console.log("_______Tracks_______");
        console.log('success');
        console.log(tracks.length);
        console.log("___________________");
        res.render("list", { tracks: tracks });
        // res.redirect("/grab" + urlUsername, { tracks: tracks });

    }



    // var username = request.params.username;
    // findUserByUsername(username, function(error, user) {
    //     if (error) return next(error);

    //     return response.render('user', user);
    // });

});



// =============================== Uploading to DB ==================================
app.post('/upload', function(req, res, next) {

        req.db // => Db object
        res.set('content-type', 'audio/mp3');
        res.set('accept-ranges', 'bytes');

        var files = req.audio;

        upload(db, files);

        function upload(db, files) {

            console.log("starting bucket");

            // var gfs = Grid(db, mongo);
            // // streaming to gridfs
            // var writestream = gfs.createWriteStream({
            //     filename: './bla.mp3'
            // });
            // this uses fs to create a read stream of a file and then that is piped to write stream
            // gfs.createReadStream(files).pipe(writestream);

            const readableTrackStream = new Readable();


            let bucket = new mongo.GridFSBucket(db, {
                bucketName: 'user4'
            });

            readableTrackStream.push(files);
            readableTrackStream.push(null);

            //error handling, e.g. file does not exist
            readableTrackStream.on('error', function(err) {
                console.log('An error occurred!', err);
                throw err;
            });

            let uploadStream = bucket.openUploadStream(files);

            readableTrackStream.pipe(uploadStream)


            uploadStream.on('data', (chunk) => {
                console.log('data')
                console.log(chunk);
            })

            uploadStream.on('error', (chunk) => {
                console.log('err');
            })

            uploadStream.on('end', () => {
                console.log('end');
            })

            // res.render("list", { bucket: bucket })

            res.redirect('/grab');


        }

    })
    // =============================== /Grabbing from DB ==================================





// updating 


// // Classical Prototypal 
// var track = {
//     title: "human ",
//     create: function(values) {
//         var instance = Object.create(this);
//         Object.keys(values).forEach(function(key) {
//         })
//         return instance;
//     },
//     saySpecies: function() {
//         console.log(this);
//     }
// };

// console.log(payload.id);
// console.log(payload.filename);
// console.log(payload.uploadDate);
// async.each(tracks, handling, function() {
//     Object.assign(tracksPayload, tracks)
//     function DisplayListTrack(trackId, databaseId, name, added, size) {
//         this.trackId = gen.next();
//         this.databaseId = databaseId;
//         this.name = name;
//         this.added = added;
//         this.size = size;
//         this.showStats = function() {
//             console.log(this);
//         }
//     }
//     var handoff = new DisplayListTrack(trackId, docs._id, docs.filename, docs.uploadDate, docs.size);
//     handling(parsedDocs)
// });
// var handling = function(parsedDocs) {
//     console.log(parsedDocs);
//     function* buildTrackId() {
//         var index = 0;
//         while (true)
//             yield index++;
//     }
//     var gen = buildTrackId();
//     var userList = [];
//     console.log("___________________")
//     console.log(gen.next().value);
// var finishedProd = userList.push(handoff);
// }

// var tracks = tracks[0];
// var payload = {
//     id: tracks._id,
//     name: tracks._filename
//         // date: tracks.uploadDate
// };
// toObject()