// const express=require("express");
// const router=express.Router();
// const isloggedin= require("../middlewares/isLoggedin")

// router.get("/",function(req,res){
//     let error=req.flash("error");
//     res.render("index",{error});
// });
// router.get("/shop",isloggedin,function(req,res){
//     res.render("shop")
// });

// router.get("/logout",isloggedin,function(req,res){
//     res.render("shop")
// });

// module.exports=router;

// const express = require("express");
// const router = express.Router();
// const isLoggedin = require("../middlewares/isLoggedin"); // Ensure this file exists!
// const ownerModel = require("../models/owner-model");
// const productModel = require("../models/product-model");
// router.get("/", function (req, res) {
//     let error = req.flash("error");
//     let success = req.flash("success");
//     res.render("index", { error,success });
// });

// router.get("/shop", isLoggedin, async function (req, res) {
//    let products=await productModel.find()

//     res.render("shop", { products,  success });
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin"); // Ensure this file exists!
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
    let success = req.flash("success") || ""; // Ensure success is always defined
    res.render("index", { success });
});

router.get("/shop", isLoggedin, async function (req, res) {
    try {
        let products = await productModel.find();
        let success = req.flash("success") || ""; // Define success inside this route

        res.render("shop", { products, success });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
