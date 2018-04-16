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

const { Readable } = require('stream');

const dbName = 'crate';
const testUsername = 'user1';

module.exports.startup = function() {

    console.log('startup');

    MongoClient.connect(mongoURI, function(err, client) {
        // Create a collection we want to drop later
        const col = client.db(dbName).collection(testUsername);
        // Insert a bunch of documents
        col.insert([{ a: 31, b: 31 }, { a: 13, b: 13 }], { w: 1 }, function(err, result) {
            test.equal(null, err);
            console.log("insert");
        });

        // database = client.db(dbName);
        // console.log(db);

        // upload(db)

        // let bucket = new db.GridFSBucket({
        //     bucketName: 'user2'
        // });

        // var ct = './ct.mp3';

        // const readableTrackStream = new Readable();
        // readableTrackStream.push(ct);
        // readableTrackStream.push(null);

        // let uploadStream = bucket.openUploadStream(ct);
        // readableTrackStream.pipe(uploadStream)

        // uploadStream.on('data', (chunk) => {
        //     console.log('data')
        // })

        // uploadStream.on('error', (chunk) => {
        //     console.log('err');
        // })

        // uploadStream.on('end', () => {
        //     console.log('end');
        // })



    });



}