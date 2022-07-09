const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
var crypto= require('crypto');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Username"],
    maxlength: [40, "Name should be under 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Provide an email"],
    validate: [validator.isEmail, "Please enter valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide a valid password"],
    minlength: [8, "Hey Password should be atleast 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  photo: {
    id: {
      type: String,
      required:true,
    },
    secure_url: {
      type: String,
      required:true,
    },
  },
  forgotpasswordToken: String,
  forgotpasswordExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//encrypt password before save -HOOKS

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

});

//validate the password with user passed password
UserSchema.methods.isValidatedPassword=async function(usersendPassword){
     return await bcrypt.compare(usersendPassword,this.password)
};

//create and return jwt token

UserSchema.methods.getjwtToken =  function(){
  return   jwt.sign({
        id:this._id
    },'Shewasgood',{
        expiresIn:'3d',
    });
};
//generate frogot possword Toek
UserSchema.methods.getforgotpasswordToken= function(){
   const forgotToken= crypto.randomBytes(20).toString('hex');
   //hashed token
   this.forgotpasswordToken=crypto.createHash('sha256').update(forgotToken).digest('hex');
   this.forgotpasswordExpiry= Date.now()+ 20*60*1000;
   return forgotToken;
}


module.exports = mongoose.model("User", UserSchema);
