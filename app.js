const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 2023;


// require database models
const User = require('./models/users.js');


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())  //cross origin resource sharing


const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const dbUrl = "mongodb://localhost:27017/foodie"
mongoose.connect(dbUrl).then(()=>{
    console.log("database connection established");
})


app.post('/signup',async(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>{
        if (userData) {
            res.send({message:"User already exists"})
        } else {                                                //User is model name
            const data = new User({
                name:req.body.name,
                mob_number:req.body.mob_number,
                email:req.body.email,
                password:req.body.password
            })  
            data.save(()=>{
                if(err){
                    res.send(err)
                }
                else{
                    res.send({message:"User registered successfully"})
                }
            })                                   
        }       
    }) 

})


app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})