const express = require('express');
const UserModel = require('../Models/UserModel');
const router = express.Router()


module.exports.getallUsers = async (req, res, next) => {
    try {
     console.log("in")
      // Parse the query parameters for pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10; // Default limit is 10
  
      // Calculate the skip value to skip records based on the current page and limit
      const skip = (page - 1) * limit;
  
      // Fetch mechanic details with pagination using the skip and limit values
      const user= await UserModel.find().skip(skip).limit(limit);
  
      // Send the paginated response back to the client
      //console.log(user)
      res.json({ status: "success", result: user });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  };

  module.exports.editUser =async(req,res)=>{
    try{
      console.log("here came")
      console.log(req.body,"ggg")
      
   UserModel.updateOne({id:req.body.id},{
           $set:{
               first_name:req.body.firstname,
               last_name:req.body.lastname,
               email:req.body.email,
               gender:req.body.gender,
               domain:req.body.domain,
               avatar:req.body.avatar

           }


       }).then((response)=>{
           console.log(response,"waszxdcfgvh")
           res.json({ message: "User data updated succesfully", status: true });

       })

   }
   catch(err)
   {
       res.json({ message: "Some thing went wrong", status: false })
   }
  }