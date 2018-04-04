var formidable = require('formidable'),
    http = require('http'),
    util = require('util');






http.createServer(function(req, res) {
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();




        form.uploadDir = "/Users/ross/homework-mega-folder/crate/test_directory";
        form.keepExtensions = true;
        form.multiples = true;
        form.bytesExpected >= 10000;
        form.bytesReceived


        form.parse(req, function(err, fields, files) {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ fields: fields, files: files }));
            console.log(fields.title);
            console.log(files.upload[0].name);
            console.log(files.upload[1].name);
            console.log(files.upload[2].name);
            console.log(files.upload[3].name);
            console.log(files.upload[4].name);
        });


        // form.on('field', function(name, value) {


        //     console.log('field n', name);
        //     // console.log('field v', value);


        // });

        // form.on('fileBegin', function(name, file) {

        //     console.log('fileBegin n', name);
        //     console.log('fileBegin f', file);
        // });

        // form.on('file', function(name, file) {

        //     console.log('file n', name);
        //     console.log('file f', file);
        // });

        form.on('error', function(err) {
            console.log('error', err);
        });






        // fs log function 

        //  / fs 


        //  data base 





        /*

            

        */


        // JSON.parse(form);


        // form.onPart = function(part) {
        //     part.addListener('data', function() {
        //         console.log(part);
        //     });
        // }

        return;

    }

    // show a file upload form
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="text" name="title"><br>' +
        '<input type="file" name="upload" multiple="multiple"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>'
    );
}).listen(3006);

console.log("app restarted");
console.log("head to port 3006");