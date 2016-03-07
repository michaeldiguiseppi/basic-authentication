var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sessions', result: undefined });
});

router.get('/set', function(req, res, next) {
  req.session.user = { username: 'Mike', id: 1};
  var result = JSON.stringify(req.session);
  res.render('index', {title: 'Sessions', result: result});
});

router.get('/get-username', function(req, res, next) {
  var result = req.session.user.username || 'Mike';
  res.render('index', {title: 'Sessions', result: result});
});

router.get('/get-id', function(req, res, next) {
  var result = req.session.user.id || 1;
  res.render('index', {title: 'Sessions', result: result});
});

router.get('/clear', function(req, res, next) {
  req.session = null;
  res.render('index', {title: 'Sessions'});
});

module.exports = router;
