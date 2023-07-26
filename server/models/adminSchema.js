const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
  county: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports= mongoose.model('Admin', adminSchema);
