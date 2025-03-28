const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const router = express.Router();

require("dotenv").config();

const indexRouter = require("./routes/index");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productsRouter");
const db = require("./config/mongoose-connection");

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

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

const isLoggedin = require("./middlewares/isLoggedin"); // Ensure this middleware exists
const productModel = require("./models/product-model");
const userModel = require("./models/user-model"); // Ensure you have a user model

// Home Route


// Start Server
app.listen(3000);


//Before starting sever and app
//You must be setup your env value remember that if it not show connected that mean some
//Problem occure here.

//Requireing express app
// const express = require("express");
// const app = express();

// //Requireing npm package
// const cookieParser = require("cookie-parser");
// const path = require("path");
// const expressSession = require("express-session");
// const flash = require("connect-flash");

// //It will help to get the all enviormental veriavle
// require("dotenv").config();

// //Requireing Database.
// const userModel = require("./models/user-model");
// const productModel = require("./models/product-model");
// const db = require("./config/mongoose-connection");

// //Requireing Routs
// const ownerRoute = require("./routes/ownersRouter");
// const userRoute = require("./routes/userRouter");
// const productRoute = require("./routes/productsRouter");
// const indexpage = require("./routes/index");

// //Setup Middilewares
// app.set("view engine", "ejs");
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(
//   expressSession({
//     secret: process.env.EXPRESS_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(flash());

// //Setup routs
// app.use("/", indexpage);
// app.use("/owners", ownerRoute);
// app.use("/users", userRoute);
// app.use("/products", productRoute);

// //App listening port
// app.listen(3000);