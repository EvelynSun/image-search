var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSearch = new Schema({
  term: String,
  when: Date
});

module.exports = mongoose.model('ImageSearch', ImageSearch);