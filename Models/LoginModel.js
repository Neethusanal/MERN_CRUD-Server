const mongoose=require('mongoose')
const LoginSchema=new mongoose.Schema({
  
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  });
  const LoginModel = mongoose.model("logindata", LoginSchema);

module.exports = LoginModel;