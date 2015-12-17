/**
 * Created by Trevor on 12/15/2015.
 */
/**
 * Created by Trevor on 12/15/2015.
 */
var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM Transaction;',
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

exports.GetAllItems = function(callback) {
    connection.query('SELECT t.*, c.name AS customer_name, firstPurchaseDate, i.title AS item_title FROM Transaction t ' +
        'JOIN Customer c ON t.customer_id=c.customer_id ' +
        'JOIN Item i ON t.item_id=i.item_id WHERE byproduct_id IS NULL;',
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

exports.GetAllByProducts = function(callback) {
    connection.query('SELECT t.*, c.name AS customer_name, firstPurchaseDate,' +
        ' bp.title AS byproduct_title FROM Transaction t ' +
        'JOIN Customer c ON t.customer_id=c.customer_id ' +
        'JOIN ByProduct bp ON t.byproduct_id=bp.byproduct_id ' +
        'WHERE t.byproduct_id IS NOT NULL;',
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

// SELECT * FROM Transaction WHERE byproduct_id IS NULL;

exports.GetAllBp2015 = function(callback) {
    connection.query('SELECT * FROM allbpTransactions2015;',
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

exports.GetAllItems2000 = function(callback) {
    connection.query('SELECT * FROM Item i WHERE EXISTS (SELECT date FROM Transaction t WHERE date LIKE \'%20\');',
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

exports.InsertItem = function(item, callback) {
    console.log(item);
    var dynamic_query = 'INSERT INTO Transaction (item_id, date, transactionPrice, qty, customer_id) VALUES(' +
         + item.item_id +
        ', \'' + item.Date + '\', ' +
        item.transactionPrice + ', ' +
        item.qty + ', ' +
        item.customer_id +
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

exports.InsertByProduct = function(byproduct, callback) {
    console.log(byproduct);
    var dynamic_query = 'INSERT INTO Transaction (byproduct_id, date, transactionPrice, qty, customer_id) VALUES(' +
        + byproduct.byproduct_id +
        ', \'' + byproduct.Date + '\', ' +
        byproduct.transactionPrice + ', ' +
        byproduct.qty + ', ' +
        byproduct.customer_id +
        ');';
    console.log("test");
    console.log(dynamic_query);
    connection.query(dynamic_query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(err + "<br />");
                return;
            }
            callback(false, result);
        }
    );
}
