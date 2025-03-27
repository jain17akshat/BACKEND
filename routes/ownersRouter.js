const express=require("express")
const router=express.Router();
const ownerModel=require("../models/owner-model")

router.get("/",function(req,res){
    res.send("hey i am also working");
})


    

router.post("/create",function(req,res){
    res.send("hey  akshat i am also working");
})

module.exports=router;