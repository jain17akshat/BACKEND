const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");

const db = require("./config/mongoose-connection");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET || "secret",
    })
);
app.use(flash());

// Static files and View Engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Additional Routes
const isLoggedIn = require("./middlewares/isLoggedIn"); // Ensure this middleware exists
const productModel = require("./models/product-model");
const userModel = require("./models/user-model"); // Ensure you have a user model

// Home Route
app.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false });
});

// Shop Route
app.get("/shop", isLoggedIn, async function (req, res) {
    let products = await productModel.find();
    res.render("shop", { products });
});

// Add to Cart Route
app.get("/addtocart/:id", isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ user: req.user.email });
    // Further implementation for adding to cart
});

// Logout Route
app.get("/logout", isLoggedIn, function (req, res) {
    res.render("shop");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
