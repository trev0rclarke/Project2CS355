/**
 * Created by Trevor on 12/16/2015.
 */
var express = require('express');
var router = express.Router();
var accountDal = require('../dal/account_dal');

router.get('/', function(req, res, next) {
    if(req.session.account === undefined) {
        res.render('index');
    }
    else {
        var data = { firstname : req.session.account.firstname };
        res.render('index', data);
    }
});


router.get('/authenticate', function(req, res) {
    accountDal.GetByEmail(req.query.email, function (err, account) {
        if (err) {
            res.render('authentication/login.ejs', { msg: err});
        }
        else if (account == null) {
            res.render('authentication/login.ejs', { msg: "User not found."});
        }
        else if (account.password != req.query.password)
            res.render('authentication/login.ejs', {msg: "Passwords do not match."});
        else {
            req.session.account = account;
            res.send('User successfully logged in.');
        }
    });
});

router.get('/login', function(req, res) {
    res.render('authentication/login.ejs');
});


module.exports = router;