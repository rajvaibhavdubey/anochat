var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport= require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");


mongoose.connect("mongodb://localhost:27017/ano_chat",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Can't tell you it's super secret!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
    res.render("landing.ejs");
});



app.get("/chat",function(req,res){
    res.render("chat.ejs");
})


// ==============
// Auth Routes
// ==============

app.post("/chat", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("landing.ejs");
        } 
        passport.authenticate("local")(req, res, function(){
            res.render("chat.ejs");
        });
    });
});





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!!!");    
});
