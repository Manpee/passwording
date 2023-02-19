if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

//LIB IMPORTS
const express = require("express")
const app = express();
const bcrypt = require("bcrypt");// imports bcrypt package
const passport = require('passport')
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")


initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id =>users.find(user => user.id ===id)
    )

const users = []
app.use(express.urlencoded({extended: false}))
app.use (flash())
app.use (session({
    secret: process.env.SESSION_SECRET,
    resave: false,// won't resave session variable if nothing changed
    saveUninitialized: false,
}
))
app.use(passport.initialize())
app.use(passport.session())


//configuring the login post functionality
app.post("/login", passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash: true,
}))


//configuring the register post functionality
app.post("/register", async (req,res) =>
{try {
    const hashedPassword= await bcrypt.hash(req.body.password,10)
    users.push({
       id: Date.now().toString(),
       name: req.body.name,
       email: req.body.email,
       password: hashedPassword,
    })
    console.log(users); // display registered users in the console
    res.redirect("/login");
} catch (e) {
    console.log(e);
    res.redirect("/register");
}}
)

//ROUTES
app.get('/', (req,res) => {
    res.render("index.ejs");
}
)
app.get('/login', (req,res) => {
    res.render("login.ejs");
}
)
app.get('/register', (req,res) => {
    res.render("register.ejs")
}
)
//END OF ROUTES

//LISTENING TO PORT
app.listen(3000);