/**
 * Created with IntelliJ IDEA.
 * User: sanojimaru
 * Date: 2014/01/04
 * Time: 20:31
 * To change this template use File | Settings | File Templates.
 */
var mysql = require('mysql');

var pool = mysql.createPool({
    host     : '192.168.201.136',
    user     : 'root',
    password : '',
    database : 'madserve'
});

var query = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(connection);
        connection.release();
    });
}

module.exports.query = query;
