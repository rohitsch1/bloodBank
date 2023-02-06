const express = require("express");
const mongoose = require("mongoose");
const BloodSample = require("../models/bloodSample");
const BloodSampleRequested = require("../models/bloodSampleRequested");
const Hospital = require("../models/hospital");
const Receiver = require("../models/receiver");
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken")

// POST endpoint for creating a hospital account
const createHospial = async (req, res) => {
  
  try {
    let data= req.body
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;

    const savedHospital = await Hospital.create(data);
    res.send(savedHospital);
  } catch (error) {
    res.status(400).send(error);
  }
}

const hospitalLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  try {
  const hospital = await Hospital.findOne({ email: email });
  if (!hospital) {
  return res.status(404).send({msg : "Document not found"});
  }
 
  const isMatch = await bcrypt.compare(password, hospital.password);
  if (!isMatch) {
    return res.status(401).send("Unauthorized");
  }
  
  const token = jwt.sign({ hospitalId: hospital._id }, "assignment101", { expiresIn: "1h" });
  res.send({ token });
  } catch (error) {
  res.status(500).send(error);
  }
  };
  
  
  

// GET endpoint to get the list of all blood samples available in all hospitals
const allSample= async (req, res) => {
  try {
  const samples = await BloodSample.find({});
  res.send(samples);
  } catch (error) {
  res.status(500).send(error);
  }
  }
  
  // POST endpoint to add the blood sample info (Only accessible to respective hospital)
  const addSample =async (req, res) => {
  try {
  const sample = new BloodSample({
  hospital: req.hospital._id,
  bloodGroup: req.body.bloodGroup,
  units: req.body.units,
  });
  const savedSample = await sample.save();
  res.send(savedSample);
  } catch (error) {
  res.status(400).send(error);
  }
  }
  
  // PUT endpoint to update the respective blood info (Only accessible to respective hospital)
  const updateSampleInfo = async (req, res) => {
  try {
  const sample = await BloodSample.findOne({
  _id: req.params.id,
  hospitalId: req.body.hospital
  });
  if (!sample) {
  return res.status(404).send();
  }
  let data = req.body
  const updatedSample = await BloodSample.findByIdAndUpdate({_id: req.params.id,hospitalId: req.body.hospital},data,{new:true});
  res.send(updatedSample);
  } catch (error) {
  res.status(500).send(error);
  }
  }
  
  // DELETE endpoint to delete the respective blood info (Only accessible to respective hospital)
  const deleteSampleInfo = async (req, res) => {
  try {
  const sample = await BloodSample.findOne({
  _id: req.params.id,
  hospitalId: req.body.hospital,
  });
  if (!sample) {
  return res.status(404).send();
  }
  await sample.remove();
  res.send({msg :"sample is deleted successfully"});
  } catch (error) {
  res.status(500).send(error);
  }
  }
  
// GET endpoint to get all the blood info that the hospital uploaded
  const hospitalListOfSample =async (req, res) => {
      try {
        const samples = await BloodSample.find({ hospital: req.params.id });
        res.send(samples);
      } catch (error) {
        res.status(500).send(error);
      }
    }

// GET endpoint to get the list of all receivers who have requested a particular blood group from its blood bank (Only accessible to respective hospital)
const requestedReceivers = async (req, res) => {
    try {
      const requests = await BloodSampleRequested.find({ bloodGroup: req.params.bloodGroup });
      const receiverIds = requests.map(request => request.receiver);
      const receivers = await Receiver.find({ _id: { $in: receiverIds } });
      res.send(receivers);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  module.exports={
    createHospial,
    hospitalLogin,
    allSample,
    addSample,
    updateSampleInfo,
    deleteSampleInfo,
    hospitalListOfSample,
    requestedReceivers}