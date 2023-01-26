//LIB IMPORTS
const express = require ("express");
const app = express();

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