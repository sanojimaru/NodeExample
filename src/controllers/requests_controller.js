/**
 * Created with IntelliJ IDEA.
 * User: sanojimaru
 * Date: 2014/01/04
 * Time: 19:53
 * To change this template use File | Settings | File Templates.
 */
var _ = require('underscore');
var fs = require('fs');
var here = require('here').here;
var crypto = require('../crypto');
var db = require('../db');

exports.action = {
    get: function(request, response) {
        var now = Date.now().toString();
        var ip = request.connection.remoteAddress;
        var transactionId = crypto.md5hex(now + ip);
        var defaultParams = {
            'request_time': now,
            't': transactionId,
            's': null, // App ID
            'ip': ip,
            'ty': null, // UDID
            'dt': null, // Device Type
            'dv': null, // Device Version
            'cr': null, // Career
            'pf': null, // Pref
            'dm': null, // Demographic
            'gd': null, // Gender
            'ag': null, // Age
            'la': null, // Latitude
            'ln': null, // Longitude
            'cg': null, // Charged
            'lb': null // Label
        }

        var params = _.extend(defaultParams, request.query);
        var sql = here(
/*
SELECT * FROM md_campaigns LIMIT 1;
*/
        ).valueOf();

        console.log("Start");
        db.query(function (con) {
            con.query(sql, function(err, rows) {
                if (err) throw err;
                console.log("query finished");
                var json = JSON.stringify(rows);
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write(json);
                response.end();
                console.log("response end");
            });
        });

        var log = JSON.stringify(params) + "\n";
        console.log("log write");
        fs.appendFile('requests.log', log, 'utf8', function (err) {
            if (err) throw err;
            console.log("log write end");
        });
    }
};
