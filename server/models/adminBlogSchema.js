const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  meetingLink: {
    type: String,
    default: 'No meeting link provided',
    required: false,
  },
  meetingdate: {
    type:Date,
    required:false,
  },
  responses: [responseSchema],
  expiryDate: {
    type: Date, // Store the expiry date as a Date object
    required: true,
  },
});

module.exports = mongoose.model('Blog', blogSchema);s