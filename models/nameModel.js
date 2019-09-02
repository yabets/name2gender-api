const mongoose = require('mongoose');

const { Schema } = mongoose;

const nameModel = new Schema(
  {
    name: { type: String },
    gender: { type: String },
    meaning: { type: String },
  },
);

module.exports = mongoose.model('Name', nameModel);
