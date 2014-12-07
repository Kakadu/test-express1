var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  fs.readFile('./form.html',function(error, data) {
    res.end(data);
  });
});

module.exports = router;
