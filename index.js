// var express    = require('express'                         );
// var mongoose   = require('mongoose'                        );
// var Grid       = require('gridfs-stream'                   );
// var gridform   = require('gridform'                        );
// var fs         = require('fs'                              );
// var formidable = require('gridform/node_modules/formidable');
// var assert     = require('assert'                          );
var express = require('express');
var app = express();
var uploadEngine = express.Router();
var fs = require('fs');
var util = require('util');
var mongodb = require('mongodb'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    // ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    // GridStore = require('mongodb').GridStore,
    GridFSBucket = require('mongodb').GridFSBucket,
    Code = require('mongodb').Code,
    // Grid = require('gridfs-stream'),
    gridform = require('gridform'),
    assert = require('assert'),
    mongoURI = 'mongodb://crateTest:password@ds125489.mlab.com:25489/crate',
    test = require('assert');


// ======================== express routing code =============================
var exphbs = require('express-handlebars')
var path = require('path');
var bodyParser = require('body-parser')

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
// ======================== express routing code =============================

var formidable = require('gridform/node_modules/formidable');

const { Readable } = require('stream');

/*
gridform uses a specific version of (1.0.14) 
however formidable has been updated (slightly)
 and i am updated the formidable used in 
 gridform to work with versions of Node 6.x and beyond.
 The original version of formidable used in gridform is listed below and 
 goes within that modules package.json 
 "raw": "formidable@1.0.14"
 */

// // Database Name
// const dbName = 'crate';
// const testUsername = 'user1';


// next step with this is to modularize the whole connection in order to 
// make a db object accessible to 
var db = require('./mongoObject.js');


db.startup()
    // db.toString();


var ct = './ct.mp3';
// function makeStrings() {
//     console.log(ct);
//     ct.toString();
//     console.log(ct);
// }
// makeStrings()



function upload(db, ct) {


    // db = db.client.db(dbName);

    console.log("starting bucket");
    let bucket = new GridFSBucket({
        bucketName: 'user2'
    });


    const readableTrackStream = new Readable();
    readableTrackStream.push(ct);
    readableTrackStream.push(null);

    let uploadStream = bucket.openUploadStream(ct);
    readableTrackStream.pipe(uploadStream)

    uploadStream.on('data', (chunk) => {
        console.log('data')
    })

    uploadStream.on('error', (chunk) => {
        console.log('err');
    })

    uploadStream.on('end', () => {
        console.log('end');
    })

}

upload(db, ct);


// // binding the upload URL to the Express Router 
// app.use("/upload", uploadEngine);
// // console.log("GLOBAL", MongoClient);
// // Reuse database object in request handlers
// app.get("/", function(req, res, db) {




// });



app.post('/upload', function(req, res, connection) {

    var something = new MongoClient();

    // assuming you've already created a db instance and opened it
    gridform.db = something.db;
    gridform.mongo = mongo;

    // create a gridform
    var form = gridform();

    // returns a custom IncomingForm
    assert(form instanceof formidable.IncomingForm);

    // optionally store per-file metadata
    form.on('fileBegin', function(name, file) {
        file.metadata = 'so meta'
    })

    // parse normally
    form.parse(req, function(err, fields, files) {
        // use files and fields as you do today
        var file = files.upload;
        file.name // the uploaded file name
        file.type // file type per [mime](https://github.com/bentomas/node-mime)
        file.size // uploaded file size (file length in GridFS) named "size" for compatibility
        file.path // same as file.name. included for compatibility
        file.lastModified // included for compatibility
            // files contain additional gridfs info
        file.root // the root of the files collection used in MongoDB ('fs' here means the full collection in mongo is named 'fs.files')
        file.id // the ObjectId for this file
        console.log("the file -->  " + file);
    });

})



app.use(function(req, res, next) {
    res.status(404).send("Can not find page")
});

app.listen(5000, function(err) {
    if (!err)
        console.log("Navigate to localhost:5000");
    else console.log(err)

});