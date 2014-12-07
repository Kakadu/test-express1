var express = require('express');
var router = express.Router();

var isGoodMovie = function(o) {
  return o.MagnetLink && o.MovieTitle && o.Genre;
};

var makeMovieJSON = function(o) {
  // remove mongodb stuff there
  //delete o["_id"];
  //return o;

  var ans = { torrents: {}, title: o.MovieTitle, year: 2014, imdb_url: null, image: null, rating: '7.5', type: 'movie'  };
  ans.title = o.MovieTitle;
  ans.year = 2014;
  ans.imdb_id = null;
  ans.image = null;
  ans.rating = '7.5';
  ans.type = 'movie';

  var t720p = {};
  t720p.url  = '720p_url';
  t720p.seed = '720p_seed';
  t720p.peer = '720p_peer';
  t720p.size = '720p_sizel';
  t720p.filesize = '720p_filesize';
  ans.torrents['720p'] = t720p;

  return ans;
}

router.get('/', function(req, res, next) {
  console.log("list service");
  var db = req.db;
  if (!db)
    console.error('bad database');

  var collection = db.get('moviescollection');

  var all = collection.find({}, {}, function(err,docs) {
    if (err) {
      console.log('some error');
      return;
    }
    var good = docs.filter(isGoodMovie);
    var count = good.length;
    good = good.map(makeMovieJSON);
    var ans = { "MovieCount": count, "MovieList": good };
    res.send( ans );
  });


});

module.exports = router;
