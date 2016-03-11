var MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    request = require('request'),
    conf = require('config');

var schedClass = new Array('FIFO', 'LIFO', 'RANDOM');
var exports = modules.exports = {};

function init() {
    var url = 'mongodb://' + conf.mongodb.serverHost + ':' + conf.mongodb.serverPort +
        '/' + conf.mongodb.db;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw Error('Cannot connect to MongoDB database ' + conf.mongodb.serverHost +
                       ':' + conf.mongodb.serverPort + '/' + conf.mongodb.db);
        }
    });
};

/*
 * Return the next Request to be crawled.
 */
function getRequest() {
    if (schedClass === 'FIFO') {
        return getRequestFifo();
    } else if (schedClass === 'LIFO') {
        return getRequestFifo();
    } else if (schedClass === 'RANDOM') {
        return getRequestFifo();
    } else {
        return getRequestFifo();
    }
};

/*
 * Return the Request with the oldest createDate.
 *
 * Note: Requests are removed from the database when they have been
 * successfully processed.
 */
function getRequestFifo() {
    var url = 'mongodb://' + conf.mongodb.serverHost + ':' + conf.mongodb.serverPort +
        '/' + requests.db;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            throw Error('Cannot connect to MongoDB database ' + conf.mongodb.serverHost +
                       ':' + conf.mongodb.serverPort + '/' + conf.mongodb.db);
        }
        
        // Get the oldest request (assume createDate is in epoch format)
        var cursor = db.collection('requests').find().sort({'createDate': 1});
        cursor.nextObject(function (err, item) {
            if (err) {
                throw Error('Error getting next object from cursor.');
            }
            return item;
        });
    });
}

exports.getRequest = getRequest;