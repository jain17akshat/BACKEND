const express =require("express");
const userModel = require("../models/user-model");
const router =express.Router();

router.get("/",function(req,res){
    res.render("index");
});

router.post("/register", async function (req, res) {
    try {
      let { email, password, fullname } = req.body;
  
      let user = await userModel.create({
        email,
        password,
        fullname,
      });
  
      res.status(201).json(user); // Send success response with status code 201
    } catch (err) {
        res.send(err.message);
    }
  });
  

module.exports=router;