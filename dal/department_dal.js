/**
 * Created by Trevor on 12/15/2015.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM Dept;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.GetByID = function(dept_id, callback) {
    console.log(dept_id);
    var query = 'SELECT * FROM Dept WHERE dept_id=' + dept_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.Insert = function(dept, callback) {
    console.log(dept);
    var dynamic_query = 'INSERT INTO Dept (title, city, state, street, zip, phone_num)' +
        'VALUES(' +
        '\'' + dept.title +
        '\', \'' + dept.city + '\', \'' +
        dept.state + '\', \'' +
        dept.street + '\', ' +
        dept.zip +
        ', \'' + dept.phone_num +
        '\');';
    console.log("test");
    console.log(dynamic_query);
    connection.query(dynamic_query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(err + "<br /> Please choose a different company name.");
                return;
            }
            callback(false, result);
        }
    );
}
