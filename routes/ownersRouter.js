// const express=require("express")
// const router=express.Router();
// const ownerModel=require("../models/owner-model")

//  if(process.env.Node_ENV === "development"){
//     router.post("/create",async function(req,res){
//   let owners=await ownerModel.find();
//   if(owners.length>0) {
//     return res
//     .status(503)
//     .send("you dont have permission to create a new owner");
//   }

// let{fullname,email,password}=req.body;

// let createdOwner= await  ownerModel.create({  
//    fullname,
//    email,
//    password,
// });
//   res.status(201).send(createdOwner);
//     })  
//  }



//  router.get("/admin", function (req, res) {
//   let success=req.flash("success");
//   res.render("createproducts", { 
//       success: req.flash("success") || "", 
//       error: req.flash("error") || "" 
//   });
// });

// module.exports=router;
const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.Node_ENV === "development") {
    router.post("/create", async function (req, res) {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(503)
                .send("You don't have permission to create a new owner");
        }

        let { fullname, email, password } = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        res.status(201).send(createdOwner);
    });
}

// Route for /admin
router.get("/admin", function (req, res) {
    let success = req.flash("success");
    let error = req.flash("error");
    
    res.render("createproducts", { 
        success: success || "", 
        error: error || "" 
    });
});

module.exports = router;
