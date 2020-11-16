const express=require('express')
const User=require('./../data/models/userModel')
const router=express.Router()

document.getElementById("register").addEventListener("click", function(event){
    event.preventDefault()
    // alert(
    // document.getElementById('name').value)
    // alert(document.getElementById('password').value)
    // alert(document.getElementById('email').value)
    router.post('/users',async (req,res)=>{

      const user= new User(req.query)
      try{
          await user.save()
          res.status(201).send(user)
      }catch(e){
          res.status(400).send(e)
      }
  })
  });