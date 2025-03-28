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

const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin"); // Ensure this file exists!

router.get("/", function (req, res) {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error,success });
});

router.get("/shop", isLoggedin, function (req, res) {
    let products = [
        {
            name: "Nike Air Max",
            price: 5999,
            bgcolor: "#f3f4f6",
            panelcolor: "#e5e7eb",
            textcolor: "#000000",
            image: "/images/nike_air_max.jpg", // Add valid image paths
        },
        {
            name: "Adidas Ultraboost",
            price: 6999,
            bgcolor: "#ffffff",
            panelcolor: "#e0e0e0",
            textcolor: "#333333",
            image: "/images/adidas_ultraboost.jpg",
        },
        {
            name: "Puma Running Shoes",
            price: 4999,
            bgcolor: "#fef3c7",
            panelcolor: "#fde68a",
            textcolor: "#000000",
            image: "/images/puma_running.jpg",
        },
    ];

    let error = req.flash("error");
    let success = req.flash("success");

    res.render("shop", { products, error, success });
});

module.exports = router;
