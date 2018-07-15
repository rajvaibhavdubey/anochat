/* var express = require("express");
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





app.listen(3000 || process.env.PORT, process.env.IP, function(){
    console.log("The server has started!!!");    
});
 */


const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const socketIO = require('socket.io');

container.resolve(function (users, _) {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/anochat', {useNewUrlParser: true});

    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(process.env.PORT || 3000, function () {
            console.log("Server started on port 3000!!!");
        });
        ConfigureExpress(app);

        //Setup Router
        const router = require('express-promise-router')();
        users.SetRouting(router);
        app.use(router);
    }

    function ConfigureExpress(app) {
        require('./passport/passport-local');

        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(validator());
        app.use(session({
            secret: "Can't tell you it's super secret!",
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        }))

        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());

        app.locals._ = _;
    }
});