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

// opening Node Stream API object for readable streams

// const { Readable } = require('stream');

const dbName = 'crate';
const testUsername = 'user1';

// module.exports.startup = function() {

//     console.log('startup');

//     MongoClient.connect(mongoURI, function(err, client) {
//         // Create a collection we want to drop later
//         const col = client.db(dbName).collection(testUsername);
//         // Insert a bunch of documents
//         col.insert([{ a: 31, b: 31 }, { a: 13, b: 13 }], { w: 1 }, function(err, result) {
//             test.equal(null, err);
//             console.log("insert");
//         });

//     });



// }


var _db;

module.exports = {

    connectToServer: function(callback) {
        MongoClient.connect("mongodb://crateTest:password@ds125489.mlab.com:25489/crate", function(err, db) {
            _db = db;
            return callback(err);
            console.log("hi");
        });
    },

    getDb: function() {
        return _db;
    }
};