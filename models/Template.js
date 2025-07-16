const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  style: { type: String },
  color: { type: String },
  font: { type: String },
  previewImage: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Template', templateSchema); 