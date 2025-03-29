

const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin"); // Ensure this file exists!
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    res.render("index", {
        error: req.flash("error")[0] || "", // Ensure error is a string, not an array
        success: req.flash("success")[0] || "", // Handle success messages if needed
    });
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

router.get("/cart",isLoggedin,async function (req,res){
 let user=await userModel.findOne({email:req.user.email}).populate("cart");
//    console.log(user.cart);
  
const bill= (Number(user.cart[0].price)+20)-Number(user.cart[0].discount)
 res.render("cart",{user,bill});
})


router.get("/addtocart/:productid", isLoggedin, async function (req, res) {

    let user = await userModel.findOne({ email: req.user.email });
   
    user.cart.push(req.params.productid);
await user.save();
req.flash("success","Added to cart")
res.redirect("/shop");
   
    });


 router.get("/logout", isLoggedin, function (req, res) {
    res.render("shop");
 });
 

module.exports = router;




