
const mongoose = require('mongoose');

const FootwearSchema = mongoose.Schema({
  footwearId: { type: mongoose.Schema.Types.ObjectId, ref: 'Storage' , required:true}
});

module.exports = mongoose.model('Footwear', FootwearSchema);