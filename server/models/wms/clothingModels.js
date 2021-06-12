
const mongoose = require('mongoose');

const ClothingSchema = mongoose.Schema({
  clothingId: 
    {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Storage' 
    }
});

module.exports = mongoose.model('Clothing', ClothingSchema);