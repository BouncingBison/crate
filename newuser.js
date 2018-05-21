var app = require('express')();


app.post('/sign', function(req, res, next) {



    var userID = req.userID;





})



app.get('grab/:username', function(request, response, next) {

    var username = request.params.username;

    req.db // => Db object

    const collection = db.collection(username);

    const amount = Promise.resolve(function(count) {

        var count = collection.count()

    });




    var username = request.params.username;
    findUserByUsername(username, function(error, user) {
        if (error) return next(error);

        return response.render('user', user);
    });
});