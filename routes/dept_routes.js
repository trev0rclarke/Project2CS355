/**
 * Created by Trevor on 12/15/2015.
 */
var express = require('express');
var router = express.Router();
var itemDal = require('../dal/item_dal');
var deptDal = require('../dal/department_dal');


router.get('/', function (req, res) {
    deptDal.GetByID(req.query.dept_id, function (err, result) {
            if (err) throw err;

            res.render('department/displayDepartmentInfo.ejs', {rs: result});
        }
    );
});

router.get('/all', function(req, res) {
    deptDal.GetAll(function (err, department) {
        if (err) throw err;
        res.render('department/displayAllDeptInfo.ejs', {dept: department});
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

    deptDal.Insert(req.query, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {

            res.send("Successfully saved the data.");
        }
    });

});


router.get('/create', function (req, res, next) {
    itemDal.GetAll(function (err, result) {
        console.log(result);
        res.render('department/departmentFormCreate.ejs', {items: result});
    })
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

