app.get('/grab', function(req, res, next) {
    req.db // => Db object
        // console.log("grabbing the db object!", req.db)
    const collection = db.collection('user2.files');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");

        grabbed(docs);
        var trackPayload;
        var trackPayloadLength = docs.length;

        console.log(trackPayloadLength);

        docs.forEach(function processing(element) {

            var trackPayload = {
                titled: element.filename,
                uploaded: element.uploadDate,
            }

            var payloadArr = [];

            if (trackPayloadLength != 0) {

                payloadArr.push(trackPayload);
                --trackPayloadLength;
            }

            if (trackPayloadLength === 0) {
                console.log("X");
                handling(payloadArr)
            }

        });


        var iterationCount = 0;


        // res.render("list", {
        //     payloadArr: payloadArr,
        //     title: trackPayload.titled,
        //     uploadDate: trackPayload.uploaded

        // })

    });





    function grabbed(docs) {

        async.each(docs, handling, )






    }



    function handling(payloadArr) {

        ++iterationCount;
        console.log("___________________")
        console.log(payloadArr);
        console.log(iterationCount);
        console.log("___________________")

    }

});