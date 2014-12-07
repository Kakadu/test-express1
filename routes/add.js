var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });\
  console.log(req.body);
  console.log(req.body.MovieTitle);
  console.log(req.body.param1);
  res.send("herr");

});

module.exports = router;
