/**
 * Created by Trevor on 12/14/2015.
 */
var express = require('express');
var router = express.Router();
var itemDal = require('../dal/item_dal');
var deptDal = require('../dal/department_dal');

/* return a drop down of all the address */
router.get('/', function (req, res) {
    itemDal.GetByID(req.query.item_id,
        function (err, result) {
            if (err){
                res.send(err +  ' You probably have a syntax error you idiot');
            }
            else {
                itemDal.GetByID(req.query.item_id, function (err, itemResults) {

                    res.render('item/displayItemInfo.ejs', {
                            rs: result,
                            item_id: req.query.item_id,
                            itemResults: itemResults
                        }
                    );

                })
            }
        }
    );
});

router.get('/all', function(req, res) {
    itemDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('item/displayAllItemInfo.ejs', {rs: result});
        });
});

router.get('/allbyproducts', function(req, res) {
    itemDal.GetAllByProducts(function (err, result) {
            if (err) throw err;

            res.render('item/displayAllByproductInfo.ejs', {byproduct: result});
        }
    );
});



router.get('/editbyproduct', function(req, res, next) {
    itemDal.GetByByProduct(req.query.byproduct_id, function (err, byproduct_result) {
        if (err) {
            var alert_class = 'alert-danger';
            var data = {
                message: "Error retrieving byproduct with id " + req.query.byproduct_id + "<p>" + err + "</p>",
                alert_class: alert_class
            };
            res.render('item/byproductEditForm.ejs', data);
        }
        else {

            itemDal.GetAll(function (err, item_results) {

                console.log(item_results);
                var data = {
                    byproduct: byproduct_result,
                    item: item_results
                };

                res.render('item/byproductEditForm.ejs', data);
            });
        }
    });
});

    router.get('/save', function (req, res) {
        console.log("name equals: " + req.query.title);

        itemDal.Insert(req.query, function (err, result) {
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
        itemDal.InsertByProduct(req.query, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Successfully saved the data!");
            }
        });
    });

    router.get('/create', function (req, res, next) {
        itemDal.GetAll(function (err, result) {
            console.log(result);
            res.render('item/itemFormCreate.ejs', {items: result});
        })
    });

    router.get('/createbyproduct', function (req, res, next) {
        itemDal.GetAllByProducts(function (err, byproducts) {
            console.log(byproducts);
            itemDal.GetAll(function(err, items) {
                res.render('item/byproductFormCreate.ejs', {items: byproducts, parent_items: items});
            });
        })
    });


    router.get('/update', function (req, res, next) {
        itemDal.Update(req.query, function (err, result) {
            var alert_class = 'alert-success';
            var message = "Successfully Updated!";

            if (err) {
                alert_class = 'alert-danger';
                message = err;
                res.render('item/displayAllByproductInfo.ejs', message);
            }
            else {
                console.log(result);
                res.send("Successfully updated!");
            }
        });
    });
module.exports = router;

