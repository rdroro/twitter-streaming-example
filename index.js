var appInfo = require('./package.json');
var Twitter = require('twitter');
var config = require('./config/twitter-config.js');
var db = require('./config/db.js');

// Init Twitter lib with authentication information
var client = new Twitter (config.auth);
var MongoClient = require('mongodb').MongoClient
var mongoURL = 'mongodb://' + db.host + ':' + db.port + '/' + db.database;

console.log(appInfo.name + ' in version ' + appInfo.version);
console.log('Stream all tweets with this following parameters: ')
console.log(config.filters);
console.log('\n\n');

MongoClient.connect(mongoURL, function(err, db) {
    if (err) { console.error('[ERROR] Impossible to connect to the database, but ... who cares !?\n'); }
    if (!err) {
        var collection =  db.collection('tweets');
    }
    // Twitter API call
    client.stream('statuses/filter', config.filters,  function(stream){
        stream.on('data', function(tweet) {
            console.log(tweet.text);
            if (!err) {
                collection.insert(tweet);
            }
        });

        stream.on('error', function(error) {
            console.log(error);
        });
    });
});
