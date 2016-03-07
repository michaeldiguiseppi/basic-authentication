var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cookies', result: undefined });
});

router.get('/set', function(req, res, next) {
  var cookie = req.query.cookie || 'chocolateChip';
  var value = req.query.rating || '8';
  res.cookie(cookie, value, {
    secure: true,
    httpOnly: true,
    signed: true
  });
  var result = JSON.stringify(req.signedCookies);
  res.render('index', { title: 'Cookies', result: result });
});

router.get('/clear', function(req, res, next) {
  var cookies = req.signedCookies;
  var keys = Object.keys(cookies);
  keys.forEach(function(key) {
    res.clearCookie(key);
  });
  var result = JSON.stringify(req.signedCookies);
  res.render('index', { title: 'Cookies', result: result });
});

router.get('/set-secret', function(req, res, next) {
  var cookie = req.query.cookie || 'chocolateChip';
  var value = req.query.rating || '8';
  res.cookie(cookie, value, {
    secure: true,
    httpOnly: true,
    signed: true
  });
  var result = JSON.stringify(req.signedCookies);
  res.render('index', { title: 'Cookies', result: result });
});

module.exports = router;
