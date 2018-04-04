/**
 * NPM Module dependencies.
 */
const express = require('express');
const crateRoute = express.Router();
const multer = require('multer');

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

/**
 * NodeJS Module dependencies.
 */
const { Readable } = require('stream');

/**
 * Create Express server && Express Router configuration.
 */
const app = express();
app.use('/yourCrate', crateRoute);

/**
 * Connect Mongo Driver to MongoDB.
 */
let db;
MongoClient.connect('mongodb://localhost/crate', (err, database) => {
    if (err) {
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    }
    db = database;
});

/**
 * GET /tracks/:trackID
 */
crateRoute.get('/:trackID', (req, res) => {
    try {
        var trackID = new ObjectID(req.params.trackID);
    } catch (err) {
        return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" });
    }
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    let bucket = new mongodb.GridFSBucket(db, {
        bucketName: 'tracks'
    });

    let downloadStream = bucket.openDownloadStream(trackID);

    console.log("download stream bucket", downloadStream);

    downloadStream.on('data', (chunk) => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });
});


crateRoute.get('/info', (req, res) => {

    try {

        var lookout = collection.find({}).maxTimeMS(1000).maxScan(100);

        console.log("did some scanning and came up with... :", lookout);

    } catch (err) {

        return res.status(404).json({ message: "IDK man, i cant find anthing or its an error" });
    }



});

/**
 * POST /tracks
 */
crateRoute.post('/yourCrate', (req, res) => {

    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage, limits: { fields: 2, fileSize: 60000000, files: 20, parts: 40 } });

    // console.log("UPLOAD", upload);
    upload.array('track')(req, res, (err) => {
        // if (err) {
        //     return res.status(400).json({ message: "Upload Request Validation Failed" });
        // } else if (!req.body.name) {
        //     return res.status(400).json({ message: "No track name in request body" });
        // }
        let trackName = req.body.name;
        // Covert buffer to Readable Stream
        const readableTrackStream = new Readable();
        console.log("RTS", readableTrackStream);
        // readableTrackStream.push(req.file);
        // // console.log(req.file);
        // readableTrackStream.push(null);
        for (const file of req.files) {
            readableTrackStream.push(file.buffer)
            readableTrackStream.push(null)
        }

        let bucket = new mongodb.GridFSBucket(db, {
            bucketName: 'tracks'
        });

        let uploadStream = bucket.openUploadStream(trackName);
        console.log("UPLOAD STREAM", uploadStream);
        let id = uploadStream.id;

        readableTrackStream.pipe(uploadStream);

        uploadStream.on('error', () => {
            return res.status(500).json({ message: "Error uploading file" });
        });

        uploadStream.on('finish', () => {
            return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
        });
    });
});

app.listen(3005, () => {
    console.log("App listening on port 3005!");
});