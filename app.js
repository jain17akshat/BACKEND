// const express =require("express")

// const app=express();

// const cookieParser=require("cookie-parser")
// const path=require("path");
// const db=require("./config/mongoose-connection")
// const ownersRouter=require("./routes/ownersRouter")
// const productsRouter=require("./routes/productsRouter")
// const userRouter=require("./routes/userRouter")
// const indexRouter=require("./routes/index")
// const expressSession=require("express-session");
// const flash=require("connect-flash");

//  require("dotenv").config();


// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());
// app.use(
//     expressSession({
//         resave:false,
//         saveUninitialized:false,
//         secret:process.env.EXPRESS_SESSION_SECRET,
//     })
// )

// app.use(flash());
// app.use(express.static(path.join(__dirname,"public")));
// app.set("view engine","ejs");


// app.use("/owners",ownersRouter);
// app.use("/users",userRouter);
// app.use("/products",productsRouter);
// app.use("/", indexRouter);
// app.get("/shop", (req, res) => {
//     res.send("Welcome to the shop!");
// });


// app.listen(3000);

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/index");

const app = express();

// Debugging: Check if routers are correctly imported
console.log("Owners Router:", typeof ownersRouter);
console.log("Products Router:", typeof productsRouter);
console.log("User Router:", typeof userRouter);
console.log("Index Router:", typeof indexRouter);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET || "default_secret",
    })
);
app.use(flash());

// Static files and view engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.use("/owners", ownersRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);

// Test route
app.get("/shop", (req, res) => {
    res.send("Welcome to the shop!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
