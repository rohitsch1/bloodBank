const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceiverSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    bloodSampleRequests: [{ type: Schema.Types.ObjectId, ref: 'BloodSampleRequested' }]
  });
  

  module.exports = mongoose.model('Receiver', ReceiverSchema)