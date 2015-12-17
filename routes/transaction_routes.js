/**
 * Created by Trevor on 12/15/2015.
 */
/**
 * Created by Trevor on 12/15/2015.
 */
var express = require('express');
var router = express.Router();
var transactionDal = require('../dal/transaction_dal');
var itemDal = require('../dal/item_dal');
var departmentDal = require('../dal/department_dal');
var customerDal = require('../dal/customer_dal');

router.get('/', function (req, res) {
    deptDal.GetByID(req.query.dept_id, function (err, result) {
            if (err) throw err;

            res.render('department/displayDepartmentInfo.ejs', {rs: result});
        }
    );
});

router.get('/allitemsales', function(req, res) {
    transactionDal.GetAllItems(function (err, result) {
            if (err) throw err;
            res.render('transaction/displayAllTransactionInfoItems.ejs', {rs: result});


        }
    );
});

router.get('/allbyproductsales', function(req, res) {
    transactionDal.GetAllByProducts(function (err, result) {
            if (err) throw err;
            res.render('transaction/displayAllTransactionsInfoByproducts.ejs', {rs: result});


        }
    );
});

router.get('/newitemsale', function(req, res) {
    transactionDal.GetAll(function (err, transactions) {
        if (err) throw err;
        else {
            itemDal.GetAll(function (err, items) {
                customerDal.GetAll(function (err, customers) {
                    res.render('transaction/transactionItemFormCreate.ejs', {
                        transactions: transactions,
                        items: items,
                        customers: customers
                        // res.render
                    });
                // departmentDal.GetAll
                });
                // itemDal.GetAll
            });
        // else
        }
    // transactionDal.GetAll
    });
});

router.get('/newbyproductsale', function(req, res) {
    transactionDal.GetAll(function (err, transactions) {
        if (err) throw err;
        else {
            itemDal.GetAllByProducts(function (err, byproducts) {
                customerDal.GetAll(function (err, customers) {
                    res.render('transaction/transactionByProductFormCreate.ejs', {
                        transactions: transactions,
                        byproducts: byproducts,
                        customers: customers
                        // res.render
                    });
                    // departmentDal.GetAll
                });
                // itemDal.GetAll
            });
            // else
        }
        // transactionDal.GetAll
    });
});

router.get('/all2015', function(req, res) {
    transactionDal.GetAllBp2015(function (err, transaction) {
        if (err) throw err;
        res.render('transaction/allTransaction2015.ejs', {rs: transaction});
    });
});

router.get('/all2000items', function(req, res) {
    transactionDal.GetAllItems2000(function (err, transaction) {
        if (err) throw err;
        // Sorry for ugly JSON!
        res.send({rs: transaction});
    });
});

router.get('/saveitem', function (req, res) {
    console.log("name equals: " + req.query.title);

    transactionDal.InsertItem(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {

            res.send("Successfully saved the data.");
        }
    });

});

router.get('/savebyproduct', function (req, res) {
    console.log("name equals: " + req.query.title);

    transactionDal.InsertByProduct(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {

            res.send("Successfully saved the data.");
        }
    });

});

router.get('/newtransaction', function(req, res) {
        res.render('transaction/newtransaction.ejs');
});

router.get('/update', function (req, res, next) {
    itemDal.Update(req.query, function (err, result) {
        var alert_class = 'alert-success';
        var message = "Successfully Updated!";

        if (err) {
            alert_class = 'alert-danger';
            message = err;
        }
        console.log(result);
        res.send("Successfully updated!");
    });
});
module.exports = router;

