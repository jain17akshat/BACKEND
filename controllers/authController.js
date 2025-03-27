const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken")

module.exports.registerUser = function (req, res) {
    try {
      let { email, password, fullname } = req.body;
  
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