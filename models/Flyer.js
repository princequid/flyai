const mongoose = require('mongoose');

const flyerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  location: { type: String },
  cta: { type: String },
  style: { type: String },
  color: { type: String },
  font: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Flyer', flyerSchema); 