const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
  },
  idNumber: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Response', responseSchema);