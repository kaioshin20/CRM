
const mongoose = require('mongoose');

const ShippedSchema = mongoose.Schema({
  shippedId: 
    {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Booked-product' 
    }
});

module.exports = mongoose.model('shipList', ShippedSchema);