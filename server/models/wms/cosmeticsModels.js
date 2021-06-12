
const mongoose = require('mongoose');

const CosmeticsSchema = mongoose.Schema({
  cosmeticsId: 
    {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Storage' 
    }
});

module.exports = mongoose.model('Cosmetics', CosmeticsSchema);