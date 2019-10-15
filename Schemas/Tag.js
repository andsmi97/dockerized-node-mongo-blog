const mongoose = require('mongoose');
const tag = new mongoose.Schema({
  title: String,
});
module.exports = mongoose.model('Tag', tag);
