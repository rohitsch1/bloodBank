const express = require("express");
const mongoose = require("mongoose");
const BloodSample = require("../models/bloodSample");
const BloodSampleRequested = require("../models/bloodSampleRequested");
const Hospital = require("../models/hospital");
const Receiver = require("../models/receiver");
const bcrypt = require("bcryptjs");


const createReceiver = async (req, res) => {
    try {

      let data = req.body
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);
      data.password = hash;
        console.log(data)
      const savedReceiver = await Receiver.create(data)
    //   console.log(savedReceiver)
      res.send({savedReceiver});
    } catch (error) {
      res.status(400).send(error);
    }
  }
  
  // POST endpoint for receiver login
  const receiverLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    try {
    const receiver = await Hospital.findOne({ email: email });
    console.log(receiver)
    if (!receiver) {
    return res.status(404).send({msg : "Document not found"});
    }
   
    const isMatch = await bcrypt.compare(password, receiver.password);
    if (!isMatch) {
      return res.status(401).send("Unauthorized");
    }
    
    const token = jwt.sign({ receiverId: receiver._id }, "assignment101", { expiresIn: "1h" });
    res.send({ token });
    } catch (error) {
    res.status(500).send(error);
    }
    };

// POST Endpoint to request a blood sample (Only accessible to receiver)
 const bloodSampleRequest = async (req, res) => {
    try {
      const request = new BloodSampleRequested({
        receiverId: req.receiver._id,
        bloodGroup: req.body.bloodGroup,
        quantity: req.body.quantity
      });
      const savedRequest = await request.save();
      res.send(savedRequest);
    } catch (error) {
      res.status(400).send(error);
    }
  }

module.exports={
    createReceiver,
    receiverLogin,
    bloodSampleRequest}
  



