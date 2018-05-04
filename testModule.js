var mongoUtil = require('mongoUtil');
var db = mongoUtil.getDb();

db.collection('users').find();