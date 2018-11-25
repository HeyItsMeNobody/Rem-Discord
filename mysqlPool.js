var mysql = require('mysql');
var config = require('./config.json');

var pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    supportBigNumbers: true,
    bigNumberStrings: true
});

var getConnection = function(callback) {
    pool.getConnection(function(err, conn) {
        callback(err, conn);
    });
}

module.exports = getConnection;