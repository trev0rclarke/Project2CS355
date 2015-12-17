var express = require('express');
var router = express.Router();
var accountDal = require('../dal/account_dal');

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.account === undefined) {
    res.render('index.ejs')
  }
  else {
    var data = { firstname : req.session.account.firstname };
    res.render('index.ejs', data);
  }
});

router.get('/save', function (req, res) {
  console.log("email equals: " + req.query.email);
  accountDal.Insert(req.query, function (err, result) {
    if (err) {
      res.send(err);
    }
    else {
      res.render('authentication/login.ejs', {msg: "You may now log in with your new credentials!"} );
    }
  });

});

router.get('/authenticate', function(req, res) {
  if(req.session.account == undefined) { //user isn't authenticated yet
    accountDal.GetByEmail(req.query.email, function (err, account) {
      if (err) {
        res.render('authentication/login.ejs', {msg: err});
      }
      else if (account == null) {
        res.render('authentication/login.ejs', {msg: "User not found."});
      }
      else if (account.password != req.query.password)
        res.render('authentication/login.ejs', {msg: "Passwords do not match."});
      else {
        req.session.account = account;
        var data = { firstname : account.firstname };
        res.render('index.ejs', {data: data});
      }
    });
  }
});

router.get('/createuser', function (req, res, next) {

    res.render('authentication/newUserForm.ejs');

});

router.get('/login', function(req, res) {
  res.render('authentication/login.ejs');
});

router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.send("YOU HAVE LOGGED OUT!");
  });
});



module.exports = router;