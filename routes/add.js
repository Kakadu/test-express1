var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.post('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });\
  var db = req.db;
  if (!db) console.error('bad database');
  var collection = db.get('moviescollection');
  var p = req.body;
  var title = p.MovieTitle;
  var cover = (p.MovieCover==='') ? null : p.MovieCover;
  var magnet = (p.MagnerLink==='') ? null : p.MagnetLink;
  var genre  = (p.Genre==='') ? null : p.Genre;

  console.log(req.body);

  collection.insert({
    "MovieTitle": title,
    "MovieCover": cover,
    "MagnetLink": magnet,
    "Genre":      genre
  }, function (err, doc) {
        if (err) {
            // If it failed, return error
            console.log("some error in mongo");
            res.send("There was a problem adding the information to the database.");
        }
        else {
            console.log("inserted");
            collection.find({},{}, function(e,docs) { console.log("docs", docs); });
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("");
            // And forward to success page
            res.redirect("");
        }
  });
});

module.exports = router;
