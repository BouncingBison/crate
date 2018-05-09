var app = require('express')();
var bodyParser = require("body-parser");

// Mongo DB modules 
var mongodb = require("mongodb");
var expressMongoDb = require('express-mongo-db');
var ObjectID = mongodb.ObjectID;
var GridFSBucket = require('mongodb').GridFSBucket;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var CONTACTS_COLLECTION = "contacts";
const MONGO_URI = 'mongodb://crateTest:password@ds125489.mlab.com:25489/crate';
const dbName = 'crate';

var Grid = require('gridfs-stream');




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
const { Readable } = require('stream');

// =============================== Grabbing from DB ==================================

app.get('/grab', function(req, res, next) {

    req.db // => Db object

    const collection = db.collection('user2.files');

    const amount = Promise.resolve(function(count) {

        var count = collection.count()
    });

    const tracks = new Promise(function(resolve, reject) {
            resolve(collection.find({}).toArray(function(err, tracks) {
                assert.equal(err, null);
                grabbed(tracks);
                // console.log(tracks);

            }))

        })
        // promise.all iterable with values
        // Promise.all([amount, tracks]).then(function(amount, tracks) {
    Promise.all([]).then(function(count, tracks) {
        console.log(count)
        console.log("all");
    });

    function grabbed(tracks) {
        console.log("_______Tracks_______");
        console.log(tracks);
        console.log("___________________");

        res.render("list", { tracks: tracks })
    }

});
// =============================== Uploading to DB ==================================
app.post('/upload', function(req, res, next) {

        req.db // => Db object
        res.set('content-type', 'audio/mp3');
        res.set('accept-ranges', 'bytes');


        var files = './newCT.mp3';


        const collection = db.collection('user2.files');



        upload(db, files);

        function upload(db, files) {

            console.log("starting bucket");

            // db = db.client.db(dbName);
            var gfs = Grid(db, mongo);

            // streaming to gridfs
            var writestream = gfs.createWriteStream({
                filename: './newCT.mp3'
            });

            // this uses fs to create a read stream of a file and then that is piped to write stream 
            fs.createReadStream('./newCT.mp3').pipe(writestream);

            //error handling, e.g. file does not exist
            readstream.on('error', function(err) {
                console.log('An error occurred!', err);
                throw err;
            });

            // readstream.pipe(response);

            // let bucket = new crate.GridFSBucket(db, {
            //     bucketName: 'user2'
            // // });

            // const readableTrackStream = new Readable();
            // readableTrackStream.push(files);
            // readableTrackStream.push(null);

            // let uploadStream = bucket.openUploadStream(files);
            // readableTrackStream.pipe(uploadStream)

            writestream.on('data', (chunk) => {
                console.log('data')
            })

            writestream.on('error', (chunk) => {
                console.log('err');
            })

            writestream.on('end', () => {
                console.log('end');
            })

            // res.render("list", { bucket: bucket })

        }

    })
    // =============================== /Grabbing from DB ==================================



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