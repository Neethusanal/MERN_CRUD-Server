const express = require('express');
const UserModel = require('../Models/UserModel');
const LoginModel=require('../Models/LoginModel')
const router = express.Router()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;

module.exports.login=async(req,res)=>{
  try{
   let {email,password}=req.body
   console.log(email,password)
   let logindata=await LoginModel.findOne({email:email})
   //console.log(logindata,"ggg")
   if(logindata)
   {
     let validPassword = await bcrypt.compare(password, logindata.password);
      console.log(validPassword)
      if (validPassword) {
       const loginId = logindata._id;
       const token = jwt.sign({ loginId }, process.env.JWT_SECRET_KEY, {
         expiresIn: maxAge
       });
       
       console.log(token)
       res
         .status(200)
         .json({ message: "Login Successfull", logindata, token, success: true });
     } else {
       const errors = { message: "Incorrect  password" };
       res.json({ errors, success: false });
     }
   } else {
     const errors = { message: "email does not exist" };
     res.json({ errors, success: false });
   }
 } catch (error) {
   res.json({message: error.message, success: false });
   
 }
};
 


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

//   module.exports.deleteUser =async(req,res)=>{
//     const userId = req.params.id;

//   try {
//     const user = await UserModel.findByIdAndUpdate({_id:userId}, { deleted: true });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     return res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log(userId)

  try {
    // Use deleteOne to remove the user from the database
    const result = await UserModel.deleteOne({ id:userId});

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports.addUser = async (req, res) => {
  console.log(req.body);
  try {
    const { firstname, lastname, gender, email, domain, avatar, available } = req.body;

    // Fetch the next available ID
    const nextUserId = await UserModel.findOne().sort({ id: -1 }).select('id').lean();
    const id = nextUserId ? nextUserId.id + 1 : 1;

    const newUser = new UserModel({
      id: id,
      first_name: firstname,
      last_name: lastname,
      gender: gender,
      email: email,
      domain: domain,
      avatar: avatar,
      available: available
    });

    // Save the user to the database
    await newUser.save();

    // Send a response
    res.json({ status: true, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};
module.exports.getUserData = async (req, res) => {
  const id = req.params.id; // Assuming you're extracting the ID from the request parameters

  try {
    const user = await UserModel.findOne({ id: id });

    if (user) {
      console.log(user);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


