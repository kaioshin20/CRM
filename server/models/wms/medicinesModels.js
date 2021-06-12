
const mongoose = require('mongoose');

const MedicineSchema = mongoose.Schema({
  medicineId: 
    {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Storage' 
    }
});

module.exports = mongoose.model('Medicine', MedicineSchema);