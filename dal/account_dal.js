/**
 * Created by Trevor on 12/16/2015.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');
var connection = mysql.createConnection(db.config);


exports.GetByEmail = function(email, callback) {
    var query = 'CALL User_GetByEmail(?)';
    var query_data = [email];
    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }
// NOTE: Stored Procedure results are wrapped in an extra array
 // and only one user record should be returned,
 // so return only the one result
        else if(result[0].length == 1) {
             callback(err, result[0][0]);
        }
        else {
            callback(err, null);
        }
        });
 }

exports.Insert = function(user, callback) {
    console.log(user);
    var dynamic_query = 'INSERT INTO User VALUES(\'' +
        user.email +
        '\', \'' + user.password + '\', \'' +
        user.firstname + '\', \'' +
        user.lastname + '\'' +
        ');';
    console.log("test");
    console.log(dynamic_query);
    connection.query(dynamic_query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(err);
                return;
            }
            callback(false, result);
        }
    );
}


