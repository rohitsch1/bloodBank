const express =require("express")
const mongoose= require("mongoose")
const routes = require("./routes/route")
const app=express()

//connecting Mongodb 
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Rohitsch:S*Crohit16@cluster0.31aen.mongodb.net/bloodSample",{
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(()=>{console.log("database is connected");})
.catch((err)=>{console.log(err);})


app.use(express.json())
app.use('/', routes)


app.listen(3000 , function (){
    console.log(`server is running on Port :${3000}`);
})