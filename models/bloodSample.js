const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BloodSampleSchema = new Schema({
  hospital: { type: Schema.Types.ObjectId, ref: 'Hospital' },
  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BloodSample', BloodSampleSchema)

