const express = require("express")
const router = express.Router()

const {
    createHospial,
    hospitalLogin,
    allSample,
    addSample,
    updateSampleInfo,
    deleteSampleInfo,
    hospitalListOfSample,
    requestedReceivers
} = require("../controllers/hospitalController")

const {createReceiver,receiverLogin,bloodSampleRequest} = require("../controllers/receiverController")
const {auth,hospital,receiver} = require("../middlewares/auth");

router.get('/test-me',(req,res)=>{
    res.send({msg : "All is fine"})
})

router.post("/hospitals",createHospial)
router.post("/hospitals/login",hospitalLogin )
router.post("/receivers",createReceiver)
router.post("/receivers/login",receiverLogin)


router.get("/bloodSamples",allSample)
router.post("/bloodSamples",auth,hospital,addSample )
router.put("/bloodSamples/:id", auth,hospital, updateSampleInfo)
router.delete("/bloodSamples/:id", auth,hospital,deleteSampleInfo )
router.get("/hospitals/:id/bloodSamples", auth,hospital,hospitalListOfSample )
router.post("/bloodSamples/request", auth,receiver,bloodSampleRequest )
router.get("/hospitals/:id/bloodRequests/:bloodGroup", auth, hospital,requestedReceivers )

module.exports=router






