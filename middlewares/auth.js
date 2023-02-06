const jwt = require('jsonwebtoken');
const Hospital = require('../models/hospital');
const Receiver = require('../models/receiver');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    // console.log(token)
    const decoded = jwt.verify(token, "assignment101");
    // console.log(decoded)
    const hospital = await Hospital.findOne({ _id: decoded.hospitalId, });
    // console.log(hospital)
    const receiver = await Receiver.findOne({ _id: decoded.receiverId, });
    // console.log(receiver)

    if (!hospital && !receiver) {
      throw new Error();
    }

    req.hospital = hospital;
    req.receiver = receiver;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const hospital = async (req, res, next) => {
  if (!req.hospital) {
    res.status(403).send({ error: 'Hospital access only.' });
  }
  next();
};

const receiver = async (req, res, next) => {
  if (!req.receiver) {
    res.status(403).send({ error: 'Receiver access only.' });
  }
  next();
};

module.exports = {
  auth,
  hospital,
  receiver,
};
