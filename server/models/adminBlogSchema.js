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

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  meetingLink: {
    type: String,
    default: 'No meeting link provided',
    required: false,
  },
  meetingDate: {
    type:Date,
    required:false,
  },
  responses: [responseSchema],
  expiryDate: {
    type: Date, // Store the expiry date as a Date object
    required: true,
  },
});

module.exports = mongoose.model('Blog', blogSchema);