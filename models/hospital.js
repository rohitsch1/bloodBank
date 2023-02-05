const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bloodSamples: [{ type: Schema.Types.ObjectId, ref: 'BloodSample' }]
  });

  module.exports =  mongoose.model('Hospital', HospitalSchema)