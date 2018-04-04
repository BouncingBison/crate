// var express    = require('express'                         );
// var mongoose   = require('mongoose'                        );
// var Grid       = require('gridfs-stream'                   );
// var gridform   = require('gridform'                        );
// var fs         = require('fs'                              );
// var formidable = require('gridform/node_modules/formidable');
// var assert     = require('assert'                          );
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var gridform = require('gridform');
var fs = require('fs');
var formidable = require('gridform/node_modules/formidable');
var assert = require('assert');
var http = require('http');
var util = require('util');


const mongoURI = 'mongodb://crateTest:password@ds125489.mlab.com:25489/crate';

var db = mongoose.connect(mongoURI);

mongoose.Promise = global.Promise;

Grid.mongo = mongoose.mongo;

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

var mongo = require('mongodb')
var gridform = require('gridform');

// assuming you've already created a db instance and opened it
gridform.db = db;
gridform.mongo = mongo;

// in your http server
var app = http.Server(function(req, res) {

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

    });
});

















































// //  connection test function 
// connection.once('open', function() {


//     var gfs = Grid(connection.db, connection.mongo);


//     var trackSchema = mongoose.Schema({
//         title: String,
//         length: Number,
//         added: { type: Date, default: Date.now }
//     });


//     var Tracks = mongoose.model('Tracks', trackSchema);


//     var silence = new Tracks({ title: 'exposed', length: 11 });
//     var noise = new Tracks({ title: 'dessert', length: 21 });

//     console.log(noise.title); // 'Silence'

// gfs.collection('tester').insert(silence);
// // writestream 
// var gridform = require('gridform');
// gridform.db = db;
// gridform.mongo = mongo;
// var form = gridform();
// returns a custom IncomingForm

// assert(form instanceof formidable.IncomingForm);

/*

The gridfs - stream module exports a constructor that accepts an open mongodb
 - native db and the mongodb - 
native driver you are using.
The db must already be opened before calling createWriteStream or createReadStream.

Now we 're ready to start streaming.

    
The writeStream has additional methods:
destroy([err]): Destroy the writeStream as soon as possible: stop writing incoming data,
 close the _store. An error event will be emitted, as well as a close event. 
 It's up to you to cleanup the GridStore if it's not desired to keep half written files in GridFS 
 (the close event returns a GridStore file which can be used to delete the file, or mark it failed).
*/



// var writestream = gfs.createWriteStream(noise);
// fs.createReadStream(mongoURI).pipe(writestream);


// // pull apart and see options 
// var readstream = gfs.createReadStream({
//     _id: '50e03d29edfdc00d34000001',
//     range: {
//         startPos: 100,
//         endPos: 500000
//     }
// });


//   All file meta-data (file name, upload date, contentType, etc) are stored in a
//    special mongodb collection separate from the actual file data.
// //     This collection can be queried directly:    
// var gfs = Grid(conn.db);
// gfs.files.find({ filename: 'myImage.png' }).toArray(function(err, files) {
// if (err)...
// console.log(files);
// })

// });


//  stock gridform data

// var mongo = require('mongodb');
// var Grid = require('gridfs-stream');

// // create or use an existing mongodb-native db instance
// // var db = new mongo.Db('yourDatabaseName', new mongo.Server("127.0.0.1", 27017));
// var gfs = Grid(db, mongo);

// // streaming to gridfs
// var writestream = gfs.createWriteStream({
//     filename: 'my_file.txt'
// });
// fs.createReadStream('/some/path').pipe(writestream);

// // streaming from gridfs
// var readstream = gfs.createReadStream({
//     filename: 'my_file.txt'
// });

// //error handling, e.g. file does not exist
// readstream.on('error', function(err) {
//     console.log('An error occurred!', err);
//     throw err;
// });

// readstream.pipe(response);

// // var writestream = gfs.createWriteStream([options]);
// // fs.createReadStream('/some/path').pipe(writestream);

// var app = http.createServer(function(req, res) {

//     connection.once('open', function(err, db) {


//         var gridform = require('gridform');
//         gridform.db = db;
//         gridform.mongo = mongo;
//         var form = gridform();

//         // returns a custom IncomingForm
//         assert(form instanceof formidable.IncomingForm);
//         // this returns AssertionError: false == true
//         console.log('assert passed');

//         // optionally store per-file metadata
//         form.on('fileBegin', function(name, file) {
//                 console.log('mmmeta');
//                 file.metadata = 'so meta'
//             })
//             // parse normally
//         form.parse(req, function(err, fields, files) {
//             console.log('start parse');
//             // use files and fields as you do today
//             var file = './ct.mp3';
//             console.log(file);
//             file.name // the uploaded file name
//             file.type // file type per [mime](https://github.com/bentomas/node-mime)
//             file.size // uploaded file size (file length in GridFS) named "size" for compatibility
//             file.path // same as file.name. included for compatibility
//             file.lastModified // included for compatibility
//                 // files contain additional gridfs info
//             file.root // the root of the files collection used in MongoDB ('fs' here means the full collection in mongo is named 'fs.files')
//             file.id // the ObjectId for this file

//         });

//         var writestream = gfs.createWriteStream([options]);
//         fs.createReadStream('mongodb://crateTest:password@ds125489.mlab.com:25489/crate').pipe(file);

//     });






//     // show a file upload form
//     console.log("setting up generic form");
//     res.writeHead(200, { 'content-type': 'text/html' });
//     res.end(
//         '<form action="/upload" enctype="multipart/form-data" method="post">' +
//         '<input type="text" name="title"><br>' +
//         '<input type="file" name="upload" multiple="multiple"><br>' +
//         '<input type="submit" value="Upload">' +
//         '</form>'
//     );
// }).listen(3006)