
const mongoose = require('mongoose');

const BookedSchema = mongoose.Schema({
  bookedId: 
    {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Booked-product' 
    }
});

module.exports = mongoose.model('booked', BookedSchema);