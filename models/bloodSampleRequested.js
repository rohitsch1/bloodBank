const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BloodSampleRequestedSchema = new Schema({
    receiver: { type: Schema.Types.ObjectId, ref: 'Receiver' },
    bloodSample: { type: Schema.Types.ObjectId, ref: 'BloodSample' },
    dateRequested: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }
  });

  module.exports =mongoose.model('BloodSampleRequested', BloodSampleRequestedSchema)