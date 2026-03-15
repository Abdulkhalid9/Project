// create a mongoose schema for notes
const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Note', noteSchema);

