
const mongoose = require('mongoose');

const FurnitureSchema = mongoose.Schema({
  furnitureId: 
    {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Storage' 
    }
});

module.exports = mongoose.model('Furniture', FurnitureSchema);