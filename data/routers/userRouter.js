const express=require('express')
const User=require('./../models/userModel')
const router=express.Router()

// var bodyParser = require('body-parser');
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); 



//Post one user
router.post('/users',async (req,res)=>{

    const user= new User(req.body)
    // const {name, email, pasword} = req.body
    // console.log(name,email,pasword)
    // let user = new User({name,email,password})
    
    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
})
//post login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})
//Get all users
router.get('/users',async (req,res)=>{
    try{
        const users= await User.find({})
        res.status(200).send(users)
    }catch(e){
        res.status(500).send(e)
    }
})
//Get one user by id
router.get('/users/:id',async (req,res)=>{
  const _id=req.params.id
    try{
        const user= await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})
//update one user
router.patch('/users/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})
//delete one user
router.delete('/users/:id',async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})
module.exports=router