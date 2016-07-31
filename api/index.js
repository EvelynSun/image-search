var express = require('express');
var Search = require('bing.search');
var ImageSearch = require('../models/image_search');

var router = express.Router();

router.get('/latest', function(req, res, next) {
  res.status(200).end('latest');
});

router.get('/imagesearch/:query', function(req, res, next) {
  var query = req.params.query;
  var offset = req.query.offset || 0;
  var size = req.query.size || 10;
  var search = new Search(process.env.BING_API_KEY);
  search.images(query, {
    top: (+offset) + (+size)
  }, function(err, result) {
    if (err) return next(err);
    var ret = result.map(makeList).slice(offset);
    saveSearchHistory(query);
    res.json(ret);
  });
});

function makeList(img) {
  return {
    "url": img.url,
    "snippet": img.title,
    "thunbnail": img.thumbnail.url,
    "context": img.sourceUrl
  }
}

function saveSearchHistory(keyword) {
  var imageSearch = ImageSearch({
    "term": keyword,
    "when": new Date()
  });
  imageSearch.save(function(err, result) {
    if (err) throw err;
  });
}
module.exports = router;
