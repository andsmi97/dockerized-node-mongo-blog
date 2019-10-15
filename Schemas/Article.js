const mongoose = require('mongoose');
const article = new mongoose.Schema(
  {
    title: String,
    image: String,
    body: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Article', article);
