
const mongoose = require('mongoose');

const ReadySchema = mongoose.Schema({
  readyId: 
    {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Booked-product' 
    }
});

module.exports = mongoose.model('Ready', ReadySchema);