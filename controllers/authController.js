const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken");
const { model } = require("mongoose");

module.exports.registerUser = async function (req, res) {
    try {
      let { email, password, fullname } = req.body;

 let user= await userModel.findOne({email:email})
 if(user)return res.status(401).send("You have  already account ,please login")
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return res.send(err.message);
  
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.send(err.message);
          else {
            try {
              let user = await userModel.create({
                email,
                password: hash,
                fullname,
              });
           let token =  generateToken(user);
              res.cookie("token", token);
              res.send("user created successfully");
  
            }
            catch (err) {
              res.send(err.message);
            }
          }
        });
      });
    } catch (err) {
      res.send(err.message);
    }
  }
//   module.exports.loginUser=async function(req,res){
//   let  {email,password} = req.body;
// let user=await userModel.findOne({email:email})
// if(!user) return req.flash("Email or password is invalid")
//   return res.redirect("/");
//   bcrypt.compare(password,user.password,function(err,result){
// if(result){
// let token=  generateToken(user);
// res.cookie("token",token);
// // res.send("you can login")
// res.redirect("/")
// }
// else{
//   return res.send("Email or password invalid")
// }

//   })
//   }

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });

  if (!user) {
      req.flash("error", "Email or password is invalid"); // Flash error message
      return res.redirect("/"); // Redirect back to home page
  }

  bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
          let token = generateToken(user);
          res.cookie("token", token);
          req.flash("success", "Login successful!"); // Flash success message
          return res.redirect("/shop"); // Redirect to shop page
      } else {
          req.flash("error", "Email or password is invalid"); // Flash error message
          return res.redirect("/"); // Redirect back to home page
      }
  });
};

  module.exports.logout=function(req,res){
    res.cookie("token","");
    res.redirect("/")
  }