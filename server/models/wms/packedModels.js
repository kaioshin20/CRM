
const mongoose = require('mongoose');

const PackedSchema = mongoose.Schema({
  packedId: 
    {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Booked-product' 
    }
});

module.exports = mongoose.model('Packed', PackedSchema);