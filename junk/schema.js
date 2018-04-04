connection.once('open', function() {

    var gfs = gridfs(connection.db);

    var trackSchema = mongoose.Schema({
        title: String,
        length: Number,
        artwork: ,
        added: { type: Date, default: Date.now }
    });


    var Tracks = mongoose.model('Tracks', trackSchema);



    var silence = new Tracks({ title: 'Silence', length: 10 });
    console.log(silence.name); // 'Silence'

    // gfs.collection('tester').insert(silence);


    // username: crateTest

    // password: password 




    mongodb: //crateTest:password@ds125489.mlab.com:25489/crate








});