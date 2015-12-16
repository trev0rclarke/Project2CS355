/**
 * Created by Trevor on 12/14/2015.
 */
var mysql = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

//connection.config.queryFormat = function (query, values) {
//    if (!values) return query;
//    return query.replace(/\:(\w+)/g, function (txt, key) {
//        if (values.hasOwnProperty(key)) {
//            return this.escape(values[key]);
//        }
//        return txt;
//    }.bind(this));
//};

exports.GetAll = function(callback) {
    connection.query('SELECT i.*, d.title AS dept_title FROM Item i JOIN Dept d ON i.dept_id=d.dept_id;',
        function(err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetAllByProducts = function(callback) {
    connection.query('SELECT bp.*, d.title AS dept_title,' +
        'i.title AS item_title FROM ByProduct' +
        ' bp JOIN Item i ON i.item_id = bp.item_id ' +
        'JOIN Dept d ON i.dept_id=d.dept_id; ',
        function(err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

exports.GetByID = function(item_id, callback) {
    console.log(item_id);
    var query = 'SELECT i.*, d.title AS dept_title FROM Item i ' +
        'JOIN Dept d ON d.dept_id=i.dept_id WHERE item_id=' + item_id + ';';
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

exports.GetByByProduct = function(byproduct_id, callback) {
    console.log(byproduct_id);
    var query = 'SELECT bp.*, d.title AS dept_title, i.dept_id AS dept_id, ' +
        'i.title AS item_title FROM ByProduct' +
        ' bp JOIN Item i ON i.item_id = bp.item_id ' +
        'JOIN Dept d ON i.dept_id=d.dept_id WHERE byproduct_id = ' + byproduct_id + ';';
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

exports.Update = function(byproduct, callback) {
    console.log(byproduct);
    var query = 'UPDATE ByProduct SET title =\'' + byproduct.name + '\'' +
        ', item_id = ' + byproduct.item_id + ' WHERE byproduct_id =' + byproduct.byproduct_id + ';';
    connection.query(query,
        function(err, result) {
            //connection.query('UPDATE address SET street = :street, city = :city, state_abbr = :state_abbr, zip = :zip WHERE address_id = :address_id', address_info, function(err, result) {
            if(err) {
                console.log(err);
                callback(err);
                return;
            }
            else{
                callback(err, result);
            }
            //exports.GetAllByProducts(function(err, byproducts) {
            //    if(err) {
            //        console.log(err);
            //        callback(err);
            //        return;
            //    }
            //    callback(err, byproducts);
            //})
        });
}

exports.Insert = function(item_info, callback) {
    console.log(item_info);
    var dynamic_query = 'INSERT INTO Item (title, serial, unitCost, qty, dept_id)' +
        'VALUES(' +
        '\' ' + item_info.title +
        '\', ' + item_info.serial + ', ' +
        item_info.cpu + ', ' +
        item_info.qty + ', ' +
        item_info.dept_id +
        ');';
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

exports.InsertByProduct = function(item_info, callback) {
    console.log(item_info);
    var dynamic_query = 'INSERT INTO ByProduct (byproduct_id, item_id, title)' +
        'VALUES(' +
        '\' ' + item_info.byproduct_id +
        '\', ' + item_info.item_id + ', \'' +
        item_info.title +
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