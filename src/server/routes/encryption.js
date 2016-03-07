var express = require('express');
var router = express.Router();
var md5 = require('md5');
var bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Encryption', result: undefined });
});

router.get('/md5', function(req, res, next) {
  var pass = 'difficultPassword';
  result = md5(pass);
  res.render('index', { title: 'Encryption', result: result });
});

router.get('/salt', function(req, res, next) {
  bcrypt.genSalt(10, function(err, salt) {
        res.render('index', { title: 'Encryption', result: salt });
      });
});

router.get('/hash', function(req, res, next) {
  var pass = 'Michael11';
  bcrypt.hash(pass, 10, function(err, hash) {
    res.render('index', { title: 'Encryption', result: hash });
  });
});

router.get('/compare', function(req, res, next) {
  var pass = 'ThisIsAwesome123';
  bcrypt.hash(pass, 8, function(err, hash) {
    bcrypt.compare('ThisIsAwesome123', hash, function(err, response) {
      res.render('index', { title: 'Encryption', result: response });
    });
  });
});


module.exports = router;
